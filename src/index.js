const { GraphQLServer } = require('graphql-yoga')
const jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
const iplocation = require("iplocation").default;


const { prisma } = require('./generated/prisma-client')
const { sort, shuffle, hasActivePromo, addUserToEmailList, handlePromo, sendPasswordReset } = require('./utils');

require('dotenv').config();

const resolvers = {
  Query: {
    videoPage: async (parent, { id, userId, showAll }, context) => {
      const optsPublished = showAll ?  {} : { published: true }; 
      const videos = await context.prisma.videos({   
        where: { ...optsPublished, ...{ id_contains: id } },
        first: 1,
      })

      if (!videos.length) { return; }      
      const video = videos[0];
      const { id: videoId, familyId, type } = video;
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
      const user = userId ? await context.prisma.user({ id: userId }) : null;
      const sitePromos = await context.prisma.sitePromoes({ where: { type } });
      const sitePromo = hasActivePromo(sitePromos);

      return {
        video,
        latestVideos: latestVideosFormat,
        promoVideo: promoVideoSelect,
        sitePromo,
        user,
      };
    },

    videos: (parent, { id='', keywords='', type='' }, context) => {
      const typeOpt = type.length? { type } : {};
      return context.prisma.videos({ 
        where: { 
          id_contains: id, 
          keywords_contains: keywords,
          published: true,
          ...typeOpt,
        }, 
        orderBy: 'createdAt_DESC', 
        first: 20
      });
    },

    userIp: async (parent, args, context) => {
      const ip = await context.userIp();
      const locationIp = ip ? await iplocation(ip).then(res => res) : ''; // TODO remove ip hardcoded and bang
      const country = locationIp ? locationIp.country : '';
      return { ip, location: country };
    },

    userPage: async (parent, { id }, context) => {
      const user = await context.prisma.user({ id });
      const quotes = await context.prisma.quotes();
      return { user, quotes };
    },

    async products(parent, args, context) {
      const items = await context.prisma.products();
      const types = items ? sort([...new Set(items.map(product => product.type))]) : [];
      return { types, items };
    },

    async promoCode(parent, { code }, context) {
      if (!code) return;
      const promoCodes = await context.prisma.promoCodes({ where: { code } });
      return promoCodes[0];
    },

    async dashboard(parent, { from, to, cloudflare }, context) { 
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
      return prisma.video({ id: parent.id }).users();
    },
  },
  
  PromoCode: {
    user(parent) {
      return prisma.promoCode({ id: parent.id }).user();
    },
  },

  Order: {
    video(parent) {
      return prisma.order({ id: parent.id }).video();
    },
  },

  User: {
    orders(parent) {
      return prisma.user({ id: parent.id }).orders();
    },
    videos(parent) {
      return prisma.user({ id: parent.id }).videos();
    },
    promoCodes(parent) {
      return prisma.user({ id: parent.id }).promoCodes();
    },
  },

  Mutation: {
    async login(parent, { token }, context) {
      const { email, password } = jwt.verify(token, process.env.JWT_SECRET);
      const userQuery = await context.prisma.users({ where: { email } });
      const user = userQuery[0];
      if (!user) { return { error: "User does not exist." } }; // TODO move to constants
      const { password: userPsw } = user;
      const isPasswordValid = passwordHash.verify(password, userPsw);
      if (!isPasswordValid) { return { error: "Invalid Password." } };
      const userToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return { token: userToken, user };
    },   

    async signup(parent, { token }, context) {
      const { email, password } = jwt.verify(token, process.env.JWT_SECRET);
      const hashedPassword = passwordHash.generate(password);
      const user = await context.prisma.user({ email });
      if (user && user.password) { return { error: 'User already exists.' } }
      const newUser = await context.prisma.upsertUser({
        where: { email },
        create: { email, password: hashedPassword },
        update: { password: hashedPassword },
      }); 
      if (process.env.NODE_ENV === 'production') {
        addUserToEmailList(email);
      }
      const userToken = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);
      return { user: newUser, token: userToken };
    },    

    async passwordUpdate(parent, { token }, context) {
      const { email, password } = jwt.verify(token, process.env.JWT_SECRET);
      const hashedPassword = passwordHash.generate(password);
      const user = await context.prisma.updateUser({ where: { email }, data: { password: hashedPassword } });
      return { user, token };
    }, 

    createUser(parent, { email, ip }, context) {
      return context.prisma.createUser({ email, ips: { set: ip } })
    },

    addUserIp(parent, { email, ips }, context) {
      return context.prisma.updateUser({
        where: { email }, data: { ips: { set: ips } },
      })
    },

    async usePromoCode(parent, { code, videoId, videoType, token }, context) {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      const promoCodes = await context.prisma.promoCodes({ 
        where: { code, user: { id: userId } }
      });
      if (!promoCodes.length) return { error: 'Promo Code does not exist.' }
      
      const { type, endDate } = promoCodes[0];
      if (type !== videoType) return { error: `Promo valid only for ${type.toLowerCase()} videos.` }

      const now = new Date();
      const promoEndDate = new Date(endDate);
      if (promoEndDate < now) return { error: 'Promo code has expired' };

      await context.prisma.updateUser({
        where: { id: userId },
        data: { videos: { connect: { id: videoId } } },
      });
      
      await context.prisma.updatePromoCode({ 
        where: { code }, 
        data: { valid: false, video: { connect: { id: videoId } } } 
      });

      return {};
    },

    async createOrder(parent, { 
      userToken,
      ips,
      videoId,
      firstName,
      lastName,
      paymentId,
      type,
      paymentEmail,
    }, context) {
      const { userId } = userToken ? jwt.verify(userToken, process.env.JWT_SECRET): false;
      const userSearchField  = userId ? { id: userId } : { email: paymentEmail };
      const userQuery = await context.prisma.user({...userSearchField});
      const updatedIps = userQuery ? [...new Set([...userQuery.ips, ...ips])] : ips;
      const user = await context.prisma.upsertUser({
        where: {...userSearchField}, 
        create: {
          email: paymentEmail,
          firstName,
          lastName,
          videos: { connect: { id: videoId } },
          ips: { set: updatedIps },
        }, update: {
          firstName,
          lastName,
          videos: { connect: { id: videoId } },
          ips: { set: updatedIps },
        }
      }); 

      await context.prisma.createOrder({
        paymentId,
        paymentEmail,
        video: { connect: { id: videoId } },
        user: { connect: { id: user.id } },
      });

      const promo = await handlePromo(context, type, user.email, firstName);
      return { promo, user };
    },

    async subscribeUpdate(parent, { email, type, subscribe }, context) {
      try {
        await context.prisma.updateUser({
          where: { email }, data: { [type]: subscribe },
        })
      } catch(err) {
        // TODO will send to Sentry
      }
    },

    async sendPasswordResetEmail(parent, { email }, context) {
      try {
        const user = await context.prisma.users({ where: { email } });
        if (!user.length) return { error: 'User does not exist.' };          
        const token = jwt.sign({ email }, process.env.JWT_SECRET); // TODO get from process
        sendPasswordReset(email, `https://www.dashinbetween.com/?reset=true&token=${token}`);
        return {};
      } catch (e) {
        return { error: 'There was an error sending the password reset email. Please try again.' };          
      }
    },

    async bulkAddVideos(parent, { titles, links, previews, starts, month, readingType, price }, context) {
      const signs = [
        'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
        'libra', 'scorpio', 'sagittarius', 'capricorn', 
        'aquarius', 'pisces',
      ]

      signs.map(async (sign, index) => {
        await context.prisma.createVideo({
          title: titles[index],
          link: links[index],
          preview: previews[index],
          start: starts[index],
          keywords: `${sign} ${readingType} ${month} 2019`,
          image: `https://s3.us-west-1.wasabisys.com/dash-videos/${month}-19/${sign}-${readingType}.jpg`,
          placeholder: `https://s3.us-west-1.wasabisys.com/dash-videos/${month}-19/${sign}-${readingType}-pl.jpg`,
          imageVertical: `https://s3.us-west-1.wasabisys.com/dash-videos/${month}-19/${sign}-${readingType}-vertical.jpg`,
          placeholderVertical: `https://s3.us-west-1.wasabisys.com/dash-videos/${month}-19/${sign}-${readingType}-vertical-pl.jpg`,
          type: "ZODIAC",
          price,
        });
      })
    }
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
