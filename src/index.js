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
      console.log('IN SERVER >>>> ', context.userIp())
      return context.prisma.videos({ where: { id_contains: id } })
    },
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
  },
}

// // const maybeGetuserIpAddress = (request)  => {
// //   console.log(" >>>>>>>> <<<<<<<<<<<<")
//   const headers = request.headers;
//   if (!headers) return null;
//   const ipAddress = headers['x-forwarded-for'];
//   if (!ipAddress) return null;
//   return ipAddress;
// // };

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (context) => ({
    prisma,
    context,
    userIp: () => {
      const headers = context.request.headers;
      console.log("HEADERS", headers)
      if (!headers) return null;
      const ipAddress = headers['x-forwarded-for'];
      if (!ipAddress) return null;
      return ipAddress;
    },
  }),
  // context: {
  //   prisma,
  // },
})

server.start(() => console.log('Server is running on http://localhost:4000'))
