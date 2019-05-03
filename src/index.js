const { GraphQLServer } = require('graphql-yoga')

const { prisma } = require('./generated/prisma-client')
const { sort, shuffle } = require('./utils');

const resolvers = {
  Query: {
    videoPage: async (parent, { id, showAll }, context) => {
      const optsPublished = showAll ?  {} : { published: true }; 
      const videos = await context.prisma.videos({   
        where: { ...optsPublished, ...{ id_contains: id } },
        first: 1,
      })

      if (!videos.length) {
        return;
      }
      
      const video = videos[0];
      const { id: videoId, familyId } = video;
      const optsFamily = familyId ? { familyId } : {};
      const latestVideos = await context.prisma.videos({
        where: {...optsFamily, ...{ id_not: videoId, published: true }}, 
        orderBy: 'createdAt_DESC', 
        first: 12
      });
      const latestVideosFormat = shuffle(latestVideos);
      const promoVideos = await context.prisma.promoVideos({ where: optsFamily });
      const promoVideo = promoVideos[Math.floor(Math.random() * promoVideos.length)];

      return {
        video,
        latestVideos: latestVideosFormat,
        promoVideo,
      };
    },
    videos: (parent, { id='', keywords='' }, context) => {
      return context.prisma.videos({ where: { 
        id_contains: id, 
        name_contains: keywords, 
        published: true 
      }})
    },
    userIp: (parent, args, context) => {
      // return context.userIp();
      return "HOME77-USER-IP";
    },
    async products(parent, args, context) {
      const items = await context.prisma.products();
      const types = items ? sort([...new Set(items.map(product => product.type))]) : [];
      return { types, items };

    },
  },
  Video: {
    users(parent) {
      return prisma.video({ id: parent.id }).users()
    }
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
    createAnonymousIp(parent, { ip }, context) {
      return context.prisma.createAnonymousIp({ ip });
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
      const paymentIds = user ? [...user.paymentIds, paymentId] : [paymentId];
      return context.prisma.upsertUser({
        where: { email }, 
        create: {
          email,
          firstName,
          lastName,
          phone,
          ips: {set: ips },
          videos: { connect: { id: videoId } },
          paymentIds: { set: paymentIds }
        }, update: {
          phone,
          videos: { connect: { id: videoId } },
          paymentIds: { set: paymentIds }
        }
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
