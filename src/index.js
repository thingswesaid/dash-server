const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    feed: (parent, args, context) => {
      return context.prisma.posts({ where: { published: true } })
    },
    drafts: (parent, args, context) => {
      return context.prisma.posts({ where: { published: false } })
    },
    post: (parent, { id }, context) => {
      return context.prisma.post({ id })
    },
    videos: (parent, { id }, context) => {
      return context.prisma.videos({ where: { id_contains: id } })
    },
    userIp: (parent, args, context) => {
      // return context.userIp();
      return "HOME77-USER-IP";
    },
    latestVideos(parent, { type, quantity, skipId, familyId }, context) {
      const opts = familyId ? { type, id_not: skipId, familyId } : { type, id_not: skipId };
      return context.prisma.videos({
        where: {...opts}, 
        orderBy: 'createdAt_DESC', 
        first: quantity
      });
    },
  },
  // TO CONTINUE:
  // IMPLEMENT latestVideos
  // CREATE endpoint for querying only specific pick a cards options
    // create family ID field (manually added - example: PKCAPR2019THNKABTME)
  Video: {
    users(parent) {
      return prisma.video({ id: parent.id }).users()
    }
  },
  Mutation: {
    createDraft(parent, { title, content }, context) {
      return context.prisma.createPost({
        title,
        content,
      })
    },
    deletePost(parent, { id }, context) {
      return context.prisma.deletePost({ id })
    },
    publish(parent, { id }, context) {
      return context.prisma.updatePost({
        where: { id },
        data: { published: true },
      })
    },
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
