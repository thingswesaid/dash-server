const { GraphQLServer } = require('graphql-yoga')
const promoCodes = require('voucher-code-generator');
const sgMail = require('@sendgrid/mail');

const { prisma } = require('./generated/prisma-client')
const { sort, shuffle, hasActivePromo } = require('./utils');
const { 
  EMAIL_SENDER, 
  EMAIL_PROMO_TEMPLATE,
  PROMO_BUY1GET1,
} = require('./constants');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handlePromo = async (context, type, email, name) => {
  const sitePromos = await context.prisma.sitePromoes({ where: { type } });
  const activePromo = hasActivePromo(sitePromos);
  
  if (activePromo) {
    const { promoOffer } = activePromo;
    if (promoOffer === PROMO_BUY1GET1) {
      const generatedCodes = promoCodes.generate({ 
        length: 5, 
        charset: promoCodes.charset("alphabetic") 
      })
      const code = generatedCodes[0].toLowerCase();
      const promoCode = await context.prisma.createPromoCode({
        code, user: { connect: { email } }
      });
      if (process.env.NODE_ENV === 'production') {
        const msg = {
          to: email,
          from: EMAIL_SENDER,
          templateId: EMAIL_PROMO_TEMPLATE,
          dynamic_template_data: {
            name,
            code: code.toUpperCase(),
          },
        };
        sgMail.send(msg); 
      }
      return promoCode;
    }
  }
  return null;
}

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
      const user = await context.prisma.users({ where: { email } });
      const { active } = user.length ? user[0] : {};

      const sitePromos = await context.prisma.sitePromoes({ where: { type } });
      const sitePromo = hasActivePromo(sitePromos);

      return {
        video,
        latestVideos: latestVideosFormat,
        promoVideo: promoVideoSelect,
        userActive: user.length ? active : true,
        sitePromo,
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
      const promoCodes = await context.prisma.promoCodes({ where: { code } });
      return promoCodes[0];
    },
    async dashboard(parent, { from, to, cloudflare }, context) { 
      // TODO SHOW PROMO CODE IN NOTIFICATION (don't close in automatic)
      // TODO refactor Promo modal show up dates (use String in SitePromo and use same logic used for modal)
      // TODO create marketing campaigns bulk email (don't miss out! 4.99 for all videos at the end of the month)
      // TODO implement DYNAMIC PRICING (2.99 off for 12 hours)
      // TODO || later - refer a friend
      // TODO implement GPAY | reimplement PAYPAL on Prisma Client (too many SDK errors)
      // TODO track affiliate link when using INFLUENCERS (bitly.com)
      // TODO >> FIX GOOGLE ECOMMERCE TRACK PURCHASE <<
      // think of monthly payment 29.99 (add promos on navbar)

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
      paymentId, 
      type
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
          ips: { set: updatedIps },
          videos: { connect: { id: videoId } },
        }, update: {
          phone,
          videos: { connect: { id: videoId } },
          ips: {set: updatedIps },
        }
      }); 

      await context.prisma.createOrder({
        paymentId,
        user: { connect: { id: userId } },
        video: { connect: { id: videoId } }
      });

      return handlePromo(context, type, email, firstName);
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
