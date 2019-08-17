const { GraphQLServer } = require('graphql-yoga')
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const iplocation = require('iplocation').default;
const promoCodes = require('voucher-code-generator');
const uniqid = require('uniqid');
const moment = require('moment');

const { prisma } = require('./generated/prisma-client')
const { 
  sort, 
  shuffle, 
  hasActivePromo, 
  addUserToEmailList, 
  handlePromo, 
  sendPasswordReset,
  getActiveVideos,
  getAllDates,
} = require('./utils');

require('dotenv').config();

const resolvers = {
  Query: {
    videoPage: async (parent, { id, userId, showAll }, context) => {
      const videos = await context.prisma.videos({   
        where: { id_contains: id },
        first: 1,
      })

      if (!videos.length) { return; }      

      const video = videos[0];
      const now = new Date();
      const activeDate = new Date(video.publishDate);
      const active = now >= activeDate;
      
      if (!showAll && !active) { return; }

      const { id: videoId, familyId, type } = video;
      const promoVideoQuery = await context.prisma.videos({   
        where: { id_contains: videoId },
        first: 1,
      }).promoVideo();

      const { promoVideo } = promoVideoQuery[0];  
      const latestVideos = await context.prisma.videos({
        where: { id_not: videoId, suggest: true }, 
        orderBy: 'createdAt_DESC',
      });

      const optsFamily = familyId ? { familyId_not: familyId } : {};
      const latestVideosFormat = shuffle(getActiveVideos(latestVideos));
      const promoVideos = promoVideo 
        ? [promoVideo] 
        : await context.prisma.promoVideos({ where: { ...optsFamily, type: "PICKACARD" } });
      
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

    videos: async (parent, { id='', keywords='', type='' }, context) => {
      const typeOpt = type.length? { type } : {};
      const videosQuery = await context.prisma.videos({ 
        where: { 
          id_contains: id, 
          keywords_contains: keywords,
          ...typeOpt,
        }, 
        orderBy: 'createdAt_DESC',
      });

      return getActiveVideos(videosQuery);
    },

    userIp: async (parent, args, context) => {
      const ip = await context.userIp();
      const locationIp = ip ? await iplocation(ip).then(res => res) : '';
      const country = locationIp ? locationIp.country : '';
      return { ip, location: country };
    },

    userPage: async (parent, { id, email }, context) => { // TODO make name more general: user not page
      const identifier = email ? { email } : { id };
      const userQuery = await context.prisma.users({ where: { ...identifier } });
      const quotes = await context.prisma.quotes();
      return { user: userQuery[0], quotes };
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

    async ordersAnalytics(parent, { userId, from, to }, context) { 
      // TODO when porting the site will add reader check (reader logged in and url have to match)
      const user = await context.prisma.user({ id: userId }); // TODO move user check call in studio page
      if (!user || user.role !== 'ADMIN' && user.role !== 'READER' ) return { 
        error: 'Not Authorized or not logged in.' 
      }

      const fromDate = from || moment().subtract(28, 'days').format('YYYY-MM-DD');
      const toDate = to || moment().format('YYYY-MM-DD');
      const allDates = getAllDates(fromDate, toDate);  
      const dateRange =  { createdAt_gte: `${fromDate}T00:00:00.000Z`, createdAt_lte: `${toDate}T23:59:59.999Z` };
      const listOrders = await context.prisma.orders({ where: { ...dateRange } });

      // TODO - when porting the site remove 30% service fee
      let sortOrders = [];
      listOrders.forEach(async ({ createdAt, amount }) => {
        const date = createdAt.slice(0, 10);
        const existingOrder = sortOrders.findIndex(order => order.date === date);
        const payPalFee = Math.round((amount * 0.050 + 0.30) * 100) / 100;
        const price = amount - payPalFee;
        if (existingOrder !== -1) { 
          sortOrders[existingOrder].count = sortOrders[existingOrder].count + 1;
          sortOrders[existingOrder].amount = Math.round((sortOrders[existingOrder].amount + price) * 100) / 100;
        } else {
          sortOrders = [...sortOrders, { id: uniqid(), date, count: 1, amount: price }];
        }
      });
      
      if (!Object.keys(sortOrders).length) {
        return { list: JSON.stringify({}), count: 0, totalAmount: 0 };
      }

      let previousIndex;
      allDates.forEach((date, index) => {
        const dateExists = sortOrders.some(order => order.date === date);
        if (!dateExists) {
          const dayBefore = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
          const indexOfDayBefore = sortOrders.findIndex(order => order.date === dayBefore);
          previousIndex = indexOfDayBefore !== -1 ? indexOfDayBefore : previousIndex + 1;
          sortOrders.splice(previousIndex + 1, 0, { date, count: 0, amount: 0 });
        }
      });
      
      const totalAmount = Object
        .values(sortOrders)
        .map(value => value.amount)
        .reduce((total, value) => total + value);
        
      return {
        list: JSON.stringify(sortOrders),
        count: listOrders.length,
        totalAmount: Math.round(totalAmount * 100) / 100,
      }
    },

    async scheduledVideos(parent, args, context) {
      const today = moment().format('YYYY-MM-DD');
      const videos = await context.prisma.videos({ where: { publishDate_gte: `${today} 04:30:00` } })
      const sortedVideos = new Map();

      videos.map((video) => {
        const key = video.publishDate;
        const collection = sortedVideos.get(key);
        if (!collection) { sortedVideos.set(key, [video]) } 
        else { collection.push(video) }
      });

      return JSON.stringify([...sortedVideos]);
    },

    async scheduledPromos(parent, args, context) {
      const today = moment().format('YYYY-MM-DD');
      const promos = await context.prisma.sitePromoes({ where: { startDate_gte: `${today} 04:30:00` }, orderBy: 'startDate_ASC' });
      return promos.map(async promo => { 
        const hasVideos = await context.prisma.sitePromoes({ where: { id: promo.id } }).videos();
        return { promo, hasVideos: !!hasVideos[0].videos.length }
      })
    },
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
      console.log('>>>>>>>> in user videos <<<<<<<<<');
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
      amount,
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
        amount,
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

    async updateUser(parent, { id, email, key, valueString, valueBoolean }, context) {
      const identifier = email ? { email } : { id };
      await context.prisma.updateUser({
        where: { ...identifier }, data: { [key]: valueString || valueBoolean },
      })
    },

    async createManualOrder(parent, { email, videoId }, context) {
      try {
        await context.prisma.createOrder({
          paymentId: `manual-order-${uniqid()}`,
          paymentEmail: email,
          video: { connect: { id: videoId } },
          user: { connect: { email } },
        });
        await context.prisma.updateUser({
          where: { email },
          data: { videos: { connect: { id: videoId } } },
        });
      } catch (error) {
        return { error };
      }
    },

    async createManualPromo(parent, { email, type }, context) {
      try {
        const generatedCodes = promoCodes.generate({ 
          length: 5, 
          charset: promoCodes.charset("alphabetic") 
        })
        const code = generatedCodes[0].toLowerCase();
        const now = new Date();
        const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        endDate.setHours(23,59,59,999);
        await context.prisma.updateUser({
          where: { email },
          data: { promoCodes: { create: { code, endDate, type } } },
        });
      } catch (error) {
        return { error };
      }
    },

    async sendPasswordResetEmail(parent, { email }, context) {
      try { // TODO move to BFF
        const user = await context.prisma.users({ where: { email } });
        if (!user.length) return { error: 'User does not exist.' };          
        const token = jwt.sign({ email }, process.env.JWT_SECRET); // TODO get from process
        sendPasswordReset(email, `https://www.dashinbetween.com/?reset=true&token=${token}`);
        return {};
      } catch (e) {
        return { error: 'There was an error sending the password reset email. Please try again.' };          
      }
    },

    async bulkAddVideos(parent, { titles, links, previews, starts, month, readingType, price, publishDate, type }, context) {
      const signs = [
        'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
        'libra', 'scorpio', 'sagittarius', 'capricorn', 
        'aquarius', 'pisces',
      ];

      let newVideos = [];
      let index = 0;

      for await (sign of signs) {
        const { id } = await context.prisma.createVideo({
          title: titles[index],
          link: links[index],
          preview: previews[index],
          start: starts[index],
          publishDate,
          keywords: `${sign} ${readingType} ${month} 2019`,
          image: `https://s3.us-west-1.wasabisys.com/dash-videos/${month}-19/${sign}-${readingType}.jpg`,
          placeholder: `https://s3.us-west-1.wasabisys.com/dash-videos/${month}-19/${sign}-${readingType}-pl.jpg`,
          imageVertical: `https://s3.us-west-1.wasabisys.com/dash-videos/${month}-19/${sign}-${readingType}-vertical.jpg`,
          placeholderVertical: `https://s3.us-west-1.wasabisys.com/dash-videos/${month}-19/${sign}-${readingType}-vertical-pl.jpg`,
          type,
          price,
        });
        index = index + 1;
        newVideos.push(id.slice(19, id.length));
      }

      return newVideos;
    }
  },

  Subscription: {
    user: {
      subscribe: async (parent, { id, email }, context) => {
          const identifier = email.length ? { email } : { id };
          const user = await context.prisma.$subscribe.user({ 
            where: { mutation_in: 'UPDATED' },
            node: { ...identifier },
          }).node();
          return user;
      },
      resolve: payload => {
        return payload
      }
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
