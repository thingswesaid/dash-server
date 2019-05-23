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
        where: { id_not: videoId, published: true }, 
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
    async dashboard(parent, { from, to, cloudflare }, context) {
      // calculate average purchases per user in between dates (users with purchases/orders) 
        // will help with buy 1 get 1 free or buy 2 get 1 free
      // calculate website conversion unique visitors / purchases -> google analytics
      // calculate average subscribed to emails
      // most purchased videos (show all videos)
      // build subscriptions
      // ---
      // build PromoCode logic
      // build Promo Modal with scheduled dates
      // refer a friend
      // implement GPAY

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
  Mutation: {
    createUser(parent, { email, ip }, context) {
      return context.prisma.createUser({ email, ips: { set: ip } })
    },
    addUserIp(parent, { email, ips }, context) {
      return context.prisma.updateUser({
        where: { email }, data: { ips: { set: ips } },
      })
    },
    async addUserToVideo(parent, { 
      email, 
      ips, 
      videoId, 
      phone, 
      firstName, 
      lastName, 
      paymentId 
    }, context) {
      const user = await context.prisma.user({ email });
      const updatedIps = user ? [...new Set([...user.ips, ...ips])] : ips;
      const { id: userId } = await context.prisma.upsertUser({
        where: { email }, 
        create: {
          email,
          firstName,
          lastName,
          phone,
          ips: {set: updatedIps },
          videos: { connect: { id: videoId } },
        }, update: {
          phone,
          videos: { connect: { id: videoId } },
          ips: {set: updatedIps },
        }
      }); 

      console.log('>>>>>>>>> USER SERVER <<<<<<<<<', userId);

      return context.prisma.createOrder({
        paymentId,
        user: { connect: { id: userId } },
        video: { connect: { id: videoId } }
      });

      // orders: { 
      //   create: { 
      //     paymentId: paymentId, video: { connect: { id: videoId } } 
      //   } 
      // },
    },
  },
}




// return context.prisma.upsertUser({
//   where: { email }, 
//   create: {
//     email,
//     firstName,
//     lastName,
//     phone,
//     ips: {set: updatedIps },
//     videos: { connect: { id: videoId } },
//     orders: { 
//       create: { 
//         paymentId: paymentId, video: { connect: { id: videoId } } 
//       } 
//     },
//   }, update: {
//     phone,
//     videos: { connect: { id: videoId } },
//     orders: { 
//       create: { 
//         paymentId: paymentId, video: { connect: { id: videoId } } 
//       } 
//     },
//     ips: {set: updatedIps },
//   }
// }); 

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
