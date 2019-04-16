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
      return "THIS-IS-USER-IP";
    },
  },
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
      return context.prisma.createUser({
        data: { email, ips: { set: ip } },
      })
    },
    addUserIp(parent, { email, ips }, context) {
      return context.prisma.updateUser({
        where: { email }, data: { ips: { set: ips } },
      })
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
