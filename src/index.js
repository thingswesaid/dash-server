const { GraphQLServer } = require('graphql-yoga')

const { prisma } = require('./generated/prisma-client')
const { sort, shuffle } = require('./utils');

const resolvers = {
  Query: {
    videoPage: async (parent, { id, email, showAll }, context) => {
      const optsPublished = showAll ?  {} : { published: true }; 
      const videos = await context.prisma.videos({   
        where: { ...optsPublished, ...{ id_contains: id } },
        first: 1,
      })

      if (!videos.length) { return; }
      
      const video = videos[0];
      const { id: videoId, familyId } = video;

      const promoVideoQuery = await context.prisma.videos({   
        where: { ...optsPublished, ...{ id_contains: videoId } },
        first: 1,
      }).promoVideo();

      const { promoVideo } = promoVideoQuery[0];

      const latestVideos = await context.prisma.videos({
        where: { id_not: videoId, published: true, suggest: true }, 
        orderBy: 'createdAt_DESC', 
        first: 12
      });
      const optsFamily = familyId ? { familyId_not: familyId } : {};
      const latestVideosFormat = shuffle(latestVideos);
      const promoVideos = promoVideo ? [promoVideo] : 
      await context.prisma.promoVideos({ where: { ...optsFamily, type: "PICKACARD" } });
      
      const promoVideoSelect = promoVideos[Math.floor(Math.random() * promoVideos.length)];
      const user = await context.prisma.users({ where: { email } });
      const { active } = user.length ? user[0] : {};

      return {
        video,
        latestVideos: latestVideosFormat,
        promoVideo: promoVideoSelect,
        userActive: user.length ? active : true,
      };
    },
    videos: (parent, { id='', keywords='' }, context) => {
      return context.prisma.videos({ where: { 
        id_contains: id, 
        name_contains: keywords, 
        published: true 
      }, first: 20})
    },
    userIp: (parent, args, context) => {
      return context.userIp();
    },
    async products(parent, args, context) {
      const items = await context.prisma.products();
      const types = items ? sort([...new Set(items.map(product => product.type))]) : [];
      return { types, items };
    },
    async promoCode(parent, { code }, context) {
      if (!code) return;
      promoCodes = await context.prisma.promoCodes({ where: { code } });
      return promoCodes[0];
    },
    async dashboard(parent, { from, to, cloudflare }, context) { 
      // build Promo Modal with scheduled dates (buy 1 get 1 free)
      // implement Email system also to send promo codes | bulk email (don't miss out! 4.99 for all videos at the end of the month)
      // || later || refer a friend
      // implement GPAY
      // track affiliate link when using INFLUENCERS (bitly.com)
      // ADD ANIMATION WHILE WAITING FOR IMAGES TO LOAD 
      // >> FIX GOOGLE ECOMMERCE TRACK PURCHASE <<

      const optsDate = cloudflare
        ? { createdAt_gte: `${from}T17:00:00.000Z`, createdAt_lte: `${to}T17:00:00.000Z` } 
        : { createdAt_gte: `${from}T00:00:00.000Z`, createdAt_lte: `${to}T23:59:59.999Z` };

      const listUsers = await context.prisma.users({ where: { ...optsDate } });
      const listOrders = await context.prisma.orders({ where: { ...optsDate } });
      return {
        orders: {
          list: listOrders,
          count: listOrders.length
        },
        users: {
          list: listUsers,
          count: listUsers.length
        }
      }
    }
  },
  Video: {
    users(parent) {
      return prisma.video({ id: parent.id }).users()
    },
  },
  PromoCode: {
    user(parent) {
      return prisma.promoCode({ id: parent.id }).user()
    },
  },
  Mutation: {
    createUser(parent, { email, ip }, context) {
      return context.prisma.createUser({ email, ips: { set: ip } })
    },
    addUserIp(parent, { email, ips }, context) {
      return context.prisma.updateUser({
        where: { email }, data: { ips: { set: ips } },
      })
    },
    async usePromoCode(parent, { code, videoId, email }, context) {
      const promoCodes = await context.prisma.promoCodes({ where: { code } });
      const promoCode = promoCodes[0];
      if (promoCode) {
        await context.prisma.updateUser({
          where: { email },
          data: { videos: { connect: { id: videoId } } },
        });
        return context.prisma.updatePromoCode({ 
          where: { code }, 
          data: { valid: false, video: { connect: { id: videoId } } } 
        });
      }
      return null;
    },
    async createOrder(parent, { 
      email, 
      ips, 
      videoId, 
      phone, 
      firstName, 
      lastName, 
      paymentId 
    }, context) {
      // check if there are site promo active (buy 1 get 1 / buy 2 get 1)
      // send email CONGRATULATIONS! 
      const user = await context.prisma.user({ email });
      const updatedIps = user ? [...new Set([...user.ips, ...ips])] : ips;
      const { id: userId } = await context.prisma.upsertUser({
        where: { email }, 
        create: {
          email,
          firstName,
          lastName,
          phone,
          ips: { set: updatedIps },
          videos: { connect: { id: videoId } },
        }, update: {
          phone,
          videos: { connect: { id: videoId } },
          ips: {set: updatedIps },
        }
      }); 

      return context.prisma.createOrder({
        paymentId,
        user: { connect: { id: userId } },
        video: { connect: { id: videoId } }
      });
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (context) => ({
    prisma,
    context,
    userIp: () => {
      const headers = context.request.headers;
      if (!headers) return null;
      const ipAddress = headers['x-forwarded-for'];
      if (!ipAddress) return null;
      return ipAddress;
    },
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
