const { GraphQLServer } = require('graphql-yoga')

const { prisma } = require('./generated/prisma-client')
const { sort, shuffle } = require('./utils');

const resolvers = {
  Query: {
    videoPage: async (parent, { id, ip, email, showAll }, context) => {
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
      const latestVideos = await context.prisma.videos({
        where: { id_not: videoId, published: true }, 
        orderBy: 'createdAt_DESC', 
        first: 12
      });
      const optsFamily = familyId ? { familyId_not: familyId } : {};
      const latestVideosFormat = shuffle(latestVideos);
      const promoVideos = await context.prisma.promoVideos({ where: optsFamily });
      const promoVideo = promoVideos[Math.floor(Math.random() * promoVideos.length)];

      const user = await context.prisma.users({ where: { email } });
      const { active } = user.length ? user[0] : {};

      return {
        video,
        latestVideos: latestVideosFormat,
        promoVideo,
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
      return context.prisma.upsertUser({
        where: { email }, 
        create: {
          email,
          firstName,
          lastName,
          phone,
          ips: {set: updatedIps },
          videos: { connect: { id: videoId } },
          payments: { create: { payId: paymentId } },
        }, update: {
          phone,
          videos: { connect: { id: videoId } },
          payments: { create: { payId: paymentId } },
          ips: {set: updatedIps },
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
