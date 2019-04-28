module.exports = {
        typeDefs: /* GraphQL */ `type AggregateAnonymousIp {
  count: Int!
}

type AggregatePost {
  count: Int!
}

type AggregateProduct {
  count: Int!
}

type AggregatePromoVideo {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateVideo {
  count: Int!
}

type AnonymousIp {
  id: ID!
  status: Status!
  ip: String!
}

type AnonymousIpConnection {
  pageInfo: PageInfo!
  edges: [AnonymousIpEdge]!
  aggregate: AggregateAnonymousIp!
}

input AnonymousIpCreateInput {
  status: Status
  ip: String!
}

type AnonymousIpEdge {
  node: AnonymousIp!
  cursor: String!
}

enum AnonymousIpOrderByInput {
  id_ASC
  id_DESC
  status_ASC
  status_DESC
  ip_ASC
  ip_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AnonymousIpPreviousValues {
  id: ID!
  status: Status!
  ip: String!
}

type AnonymousIpSubscriptionPayload {
  mutation: MutationType!
  node: AnonymousIp
  updatedFields: [String!]
  previousValues: AnonymousIpPreviousValues
}

input AnonymousIpSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AnonymousIpWhereInput
  AND: [AnonymousIpSubscriptionWhereInput!]
  OR: [AnonymousIpSubscriptionWhereInput!]
  NOT: [AnonymousIpSubscriptionWhereInput!]
}

input AnonymousIpUpdateInput {
  status: Status
  ip: String
}

input AnonymousIpUpdateManyMutationInput {
  status: Status
  ip: String
}

input AnonymousIpWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  status: Status
  status_not: Status
  status_in: [Status!]
  status_not_in: [Status!]
  ip: String
  ip_not: String
  ip_in: [String!]
  ip_not_in: [String!]
  ip_lt: String
  ip_lte: String
  ip_gt: String
  ip_gte: String
  ip_contains: String
  ip_not_contains: String
  ip_starts_with: String
  ip_not_starts_with: String
  ip_ends_with: String
  ip_not_ends_with: String
  AND: [AnonymousIpWhereInput!]
  OR: [AnonymousIpWhereInput!]
  NOT: [AnonymousIpWhereInput!]
}

input AnonymousIpWhereUniqueInput {
  id: ID
}

type BatchPayload {
  count: Long!
}

scalar Long

type Mutation {
  createAnonymousIp(data: AnonymousIpCreateInput!): AnonymousIp!
  updateAnonymousIp(data: AnonymousIpUpdateInput!, where: AnonymousIpWhereUniqueInput!): AnonymousIp
  updateManyAnonymousIps(data: AnonymousIpUpdateManyMutationInput!, where: AnonymousIpWhereInput): BatchPayload!
  upsertAnonymousIp(where: AnonymousIpWhereUniqueInput!, create: AnonymousIpCreateInput!, update: AnonymousIpUpdateInput!): AnonymousIp!
  deleteAnonymousIp(where: AnonymousIpWhereUniqueInput!): AnonymousIp
  deleteManyAnonymousIps(where: AnonymousIpWhereInput): BatchPayload!
  createPost(data: PostCreateInput!): Post!
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateManyPosts(data: PostUpdateManyMutationInput!, where: PostWhereInput): BatchPayload!
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  deletePost(where: PostWhereUniqueInput!): Post
  deleteManyPosts(where: PostWhereInput): BatchPayload!
  createProduct(data: ProductCreateInput!): Product!
  updateProduct(data: ProductUpdateInput!, where: ProductWhereUniqueInput!): Product
  updateManyProducts(data: ProductUpdateManyMutationInput!, where: ProductWhereInput): BatchPayload!
  upsertProduct(where: ProductWhereUniqueInput!, create: ProductCreateInput!, update: ProductUpdateInput!): Product!
  deleteProduct(where: ProductWhereUniqueInput!): Product
  deleteManyProducts(where: ProductWhereInput): BatchPayload!
  createPromoVideo(data: PromoVideoCreateInput!): PromoVideo!
  updatePromoVideo(data: PromoVideoUpdateInput!, where: PromoVideoWhereUniqueInput!): PromoVideo
  updateManyPromoVideos(data: PromoVideoUpdateManyMutationInput!, where: PromoVideoWhereInput): BatchPayload!
  upsertPromoVideo(where: PromoVideoWhereUniqueInput!, create: PromoVideoCreateInput!, update: PromoVideoUpdateInput!): PromoVideo!
  deletePromoVideo(where: PromoVideoWhereUniqueInput!): PromoVideo
  deleteManyPromoVideos(where: PromoVideoWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createVideo(data: VideoCreateInput!): Video!
  updateVideo(data: VideoUpdateInput!, where: VideoWhereUniqueInput!): Video
  updateManyVideos(data: VideoUpdateManyMutationInput!, where: VideoWhereInput): BatchPayload!
  upsertVideo(where: VideoWhereUniqueInput!, create: VideoCreateInput!, update: VideoUpdateInput!): Video!
  deleteVideo(where: VideoWhereUniqueInput!): Video
  deleteManyVideos(where: VideoWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Post {
  id: ID!
  published: Boolean!
  title: String!
  content: String!
}

type PostConnection {
  pageInfo: PageInfo!
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  published: Boolean
  title: String!
  content: String!
}

type PostEdge {
  node: Post!
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  published_ASC
  published_DESC
  title_ASC
  title_DESC
  content_ASC
  content_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PostPreviousValues {
  id: ID!
  published: Boolean!
  title: String!
  content: String!
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PostWhereInput
  AND: [PostSubscriptionWhereInput!]
  OR: [PostSubscriptionWhereInput!]
  NOT: [PostSubscriptionWhereInput!]
}

input PostUpdateInput {
  published: Boolean
  title: String
  content: String
}

input PostUpdateManyMutationInput {
  published: Boolean
  title: String
  content: String
}

input PostWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  published: Boolean
  published_not: Boolean
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  AND: [PostWhereInput!]
  OR: [PostWhereInput!]
  NOT: [PostWhereInput!]
}

input PostWhereUniqueInput {
  id: ID
}

type Product {
  id: ID!
  link: String!
  name: String!
  description: String!
  image: String!
  placeholder: String!
  type: String!
}

type ProductConnection {
  pageInfo: PageInfo!
  edges: [ProductEdge]!
  aggregate: AggregateProduct!
}

input ProductCreateInput {
  link: String!
  name: String!
  description: String!
  image: String!
  placeholder: String!
  type: String!
}

type ProductEdge {
  node: Product!
  cursor: String!
}

enum ProductOrderByInput {
  id_ASC
  id_DESC
  link_ASC
  link_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  image_ASC
  image_DESC
  placeholder_ASC
  placeholder_DESC
  type_ASC
  type_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ProductPreviousValues {
  id: ID!
  link: String!
  name: String!
  description: String!
  image: String!
  placeholder: String!
  type: String!
}

type ProductSubscriptionPayload {
  mutation: MutationType!
  node: Product
  updatedFields: [String!]
  previousValues: ProductPreviousValues
}

input ProductSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ProductWhereInput
  AND: [ProductSubscriptionWhereInput!]
  OR: [ProductSubscriptionWhereInput!]
  NOT: [ProductSubscriptionWhereInput!]
}

input ProductUpdateInput {
  link: String
  name: String
  description: String
  image: String
  placeholder: String
  type: String
}

input ProductUpdateManyMutationInput {
  link: String
  name: String
  description: String
  image: String
  placeholder: String
  type: String
}

input ProductWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  link: String
  link_not: String
  link_in: [String!]
  link_not_in: [String!]
  link_lt: String
  link_lte: String
  link_gt: String
  link_gte: String
  link_contains: String
  link_not_contains: String
  link_starts_with: String
  link_not_starts_with: String
  link_ends_with: String
  link_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  placeholder: String
  placeholder_not: String
  placeholder_in: [String!]
  placeholder_not_in: [String!]
  placeholder_lt: String
  placeholder_lte: String
  placeholder_gt: String
  placeholder_gte: String
  placeholder_contains: String
  placeholder_not_contains: String
  placeholder_starts_with: String
  placeholder_not_starts_with: String
  placeholder_ends_with: String
  placeholder_not_ends_with: String
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
  AND: [ProductWhereInput!]
  OR: [ProductWhereInput!]
  NOT: [ProductWhereInput!]
}

input ProductWhereUniqueInput {
  id: ID
}

type PromoVideo {
  id: ID!
  link: String!
  title: String!
  description: String!
  image: String!
  placeholder: String
  familyId: String!
  banner: String!
  bannerSmall: String!
}

type PromoVideoConnection {
  pageInfo: PageInfo!
  edges: [PromoVideoEdge]!
  aggregate: AggregatePromoVideo!
}

input PromoVideoCreateInput {
  link: String!
  title: String!
  description: String!
  image: String!
  placeholder: String
  familyId: String
  banner: String!
  bannerSmall: String!
}

type PromoVideoEdge {
  node: PromoVideo!
  cursor: String!
}

enum PromoVideoOrderByInput {
  id_ASC
  id_DESC
  link_ASC
  link_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  image_ASC
  image_DESC
  placeholder_ASC
  placeholder_DESC
  familyId_ASC
  familyId_DESC
  banner_ASC
  banner_DESC
  bannerSmall_ASC
  bannerSmall_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PromoVideoPreviousValues {
  id: ID!
  link: String!
  title: String!
  description: String!
  image: String!
  placeholder: String
  familyId: String!
  banner: String!
  bannerSmall: String!
}

type PromoVideoSubscriptionPayload {
  mutation: MutationType!
  node: PromoVideo
  updatedFields: [String!]
  previousValues: PromoVideoPreviousValues
}

input PromoVideoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PromoVideoWhereInput
  AND: [PromoVideoSubscriptionWhereInput!]
  OR: [PromoVideoSubscriptionWhereInput!]
  NOT: [PromoVideoSubscriptionWhereInput!]
}

input PromoVideoUpdateInput {
  link: String
  title: String
  description: String
  image: String
  placeholder: String
  familyId: String
  banner: String
  bannerSmall: String
}

input PromoVideoUpdateManyMutationInput {
  link: String
  title: String
  description: String
  image: String
  placeholder: String
  familyId: String
  banner: String
  bannerSmall: String
}

input PromoVideoWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  link: String
  link_not: String
  link_in: [String!]
  link_not_in: [String!]
  link_lt: String
  link_lte: String
  link_gt: String
  link_gte: String
  link_contains: String
  link_not_contains: String
  link_starts_with: String
  link_not_starts_with: String
  link_ends_with: String
  link_not_ends_with: String
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  placeholder: String
  placeholder_not: String
  placeholder_in: [String!]
  placeholder_not_in: [String!]
  placeholder_lt: String
  placeholder_lte: String
  placeholder_gt: String
  placeholder_gte: String
  placeholder_contains: String
  placeholder_not_contains: String
  placeholder_starts_with: String
  placeholder_not_starts_with: String
  placeholder_ends_with: String
  placeholder_not_ends_with: String
  familyId: String
  familyId_not: String
  familyId_in: [String!]
  familyId_not_in: [String!]
  familyId_lt: String
  familyId_lte: String
  familyId_gt: String
  familyId_gte: String
  familyId_contains: String
  familyId_not_contains: String
  familyId_starts_with: String
  familyId_not_starts_with: String
  familyId_ends_with: String
  familyId_not_ends_with: String
  banner: String
  banner_not: String
  banner_in: [String!]
  banner_not_in: [String!]
  banner_lt: String
  banner_lte: String
  banner_gt: String
  banner_gte: String
  banner_contains: String
  banner_not_contains: String
  banner_starts_with: String
  banner_not_starts_with: String
  banner_ends_with: String
  banner_not_ends_with: String
  bannerSmall: String
  bannerSmall_not: String
  bannerSmall_in: [String!]
  bannerSmall_not_in: [String!]
  bannerSmall_lt: String
  bannerSmall_lte: String
  bannerSmall_gt: String
  bannerSmall_gte: String
  bannerSmall_contains: String
  bannerSmall_not_contains: String
  bannerSmall_starts_with: String
  bannerSmall_not_starts_with: String
  bannerSmall_ends_with: String
  bannerSmall_not_ends_with: String
  AND: [PromoVideoWhereInput!]
  OR: [PromoVideoWhereInput!]
  NOT: [PromoVideoWhereInput!]
}

input PromoVideoWhereUniqueInput {
  id: ID
}

type Query {
  anonymousIp(where: AnonymousIpWhereUniqueInput!): AnonymousIp
  anonymousIps(where: AnonymousIpWhereInput, orderBy: AnonymousIpOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AnonymousIp]!
  anonymousIpsConnection(where: AnonymousIpWhereInput, orderBy: AnonymousIpOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AnonymousIpConnection!
  post(where: PostWhereUniqueInput!): Post
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  product(where: ProductWhereUniqueInput!): Product
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product]!
  productsConnection(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProductConnection!
  promoVideo(where: PromoVideoWhereUniqueInput!): PromoVideo
  promoVideos(where: PromoVideoWhereInput, orderBy: PromoVideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PromoVideo]!
  promoVideosConnection(where: PromoVideoWhereInput, orderBy: PromoVideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PromoVideoConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  video(where: VideoWhereUniqueInput!): Video
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video]!
  videosConnection(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoConnection!
  node(id: ID!): Node
}

enum Status {
  ACTIVE
  BLOCKED
}

type Subscription {
  anonymousIp(where: AnonymousIpSubscriptionWhereInput): AnonymousIpSubscriptionPayload
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  product(where: ProductSubscriptionWhereInput): ProductSubscriptionPayload
  promoVideo(where: PromoVideoSubscriptionWhereInput): PromoVideoSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  video(where: VideoSubscriptionWhereInput): VideoSubscriptionPayload
}

type User {
  id: ID!
  firstName: String
  lastName: String
  email: String!
  phone: String
  ips: [String!]!
  subscribed: Boolean!
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video!]
  status: Status!
  paymentIds: [String!]!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  firstName: String
  lastName: String
  email: String!
  phone: String
  ips: UserCreateipsInput
  subscribed: Boolean
  videos: VideoCreateManyWithoutUsersInput
  status: Status
  paymentIds: UserCreatepaymentIdsInput
}

input UserCreateipsInput {
  set: [String!]
}

input UserCreateManyWithoutVideosInput {
  create: [UserCreateWithoutVideosInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreatepaymentIdsInput {
  set: [String!]
}

input UserCreateWithoutVideosInput {
  firstName: String
  lastName: String
  email: String!
  phone: String
  ips: UserCreateipsInput
  subscribed: Boolean
  status: Status
  paymentIds: UserCreatepaymentIdsInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  email_ASC
  email_DESC
  phone_ASC
  phone_DESC
  subscribed_ASC
  subscribed_DESC
  status_ASC
  status_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  firstName: String
  lastName: String
  email: String!
  phone: String
  ips: [String!]!
  subscribed: Boolean!
  status: Status!
  paymentIds: [String!]!
}

input UserScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  subscribed: Boolean
  subscribed_not: Boolean
  status: Status
  status_not: Status
  status_in: [Status!]
  status_not_in: [Status!]
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  firstName: String
  lastName: String
  email: String
  phone: String
  ips: UserUpdateipsInput
  subscribed: Boolean
  videos: VideoUpdateManyWithoutUsersInput
  status: Status
  paymentIds: UserUpdatepaymentIdsInput
}

input UserUpdateipsInput {
  set: [String!]
}

input UserUpdateManyDataInput {
  firstName: String
  lastName: String
  email: String
  phone: String
  ips: UserUpdateipsInput
  subscribed: Boolean
  status: Status
  paymentIds: UserUpdatepaymentIdsInput
}

input UserUpdateManyMutationInput {
  firstName: String
  lastName: String
  email: String
  phone: String
  ips: UserUpdateipsInput
  subscribed: Boolean
  status: Status
  paymentIds: UserUpdatepaymentIdsInput
}

input UserUpdateManyWithoutVideosInput {
  create: [UserCreateWithoutVideosInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutVideosInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutVideosInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdatepaymentIdsInput {
  set: [String!]
}

input UserUpdateWithoutVideosDataInput {
  firstName: String
  lastName: String
  email: String
  phone: String
  ips: UserUpdateipsInput
  subscribed: Boolean
  status: Status
  paymentIds: UserUpdatepaymentIdsInput
}

input UserUpdateWithWhereUniqueWithoutVideosInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutVideosDataInput!
}

input UserUpsertWithWhereUniqueWithoutVideosInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutVideosDataInput!
  create: UserCreateWithoutVideosInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  subscribed: Boolean
  subscribed_not: Boolean
  videos_every: VideoWhereInput
  videos_some: VideoWhereInput
  videos_none: VideoWhereInput
  status: Status
  status_not: Status
  status_in: [Status!]
  status_not_in: [Status!]
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type Video {
  id: ID!
  name: String!
  title: String
  link: String!
  preview: String!
  image: String!
  placeholder: String
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  published: Boolean!
  amount: Float
  start: Int!
  orderIds: [String!]!
  type: VideoType!
  familyId: String
}

type VideoConnection {
  pageInfo: PageInfo!
  edges: [VideoEdge]!
  aggregate: AggregateVideo!
}

input VideoCreateInput {
  name: String!
  title: String
  link: String!
  preview: String!
  image: String!
  placeholder: String
  users: UserCreateManyWithoutVideosInput
  published: Boolean
  amount: Float
  start: Int!
  orderIds: VideoCreateorderIdsInput
  type: VideoType!
  familyId: String
}

input VideoCreateManyWithoutUsersInput {
  create: [VideoCreateWithoutUsersInput!]
  connect: [VideoWhereUniqueInput!]
}

input VideoCreateorderIdsInput {
  set: [String!]
}

input VideoCreateWithoutUsersInput {
  name: String!
  title: String
  link: String!
  preview: String!
  image: String!
  placeholder: String
  published: Boolean
  amount: Float
  start: Int!
  orderIds: VideoCreateorderIdsInput
  type: VideoType!
  familyId: String
}

type VideoEdge {
  node: Video!
  cursor: String!
}

enum VideoOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  title_ASC
  title_DESC
  link_ASC
  link_DESC
  preview_ASC
  preview_DESC
  image_ASC
  image_DESC
  placeholder_ASC
  placeholder_DESC
  published_ASC
  published_DESC
  amount_ASC
  amount_DESC
  start_ASC
  start_DESC
  type_ASC
  type_DESC
  familyId_ASC
  familyId_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VideoPreviousValues {
  id: ID!
  name: String!
  title: String
  link: String!
  preview: String!
  image: String!
  placeholder: String
  published: Boolean!
  amount: Float
  start: Int!
  orderIds: [String!]!
  type: VideoType!
  familyId: String
}

input VideoScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  link: String
  link_not: String
  link_in: [String!]
  link_not_in: [String!]
  link_lt: String
  link_lte: String
  link_gt: String
  link_gte: String
  link_contains: String
  link_not_contains: String
  link_starts_with: String
  link_not_starts_with: String
  link_ends_with: String
  link_not_ends_with: String
  preview: String
  preview_not: String
  preview_in: [String!]
  preview_not_in: [String!]
  preview_lt: String
  preview_lte: String
  preview_gt: String
  preview_gte: String
  preview_contains: String
  preview_not_contains: String
  preview_starts_with: String
  preview_not_starts_with: String
  preview_ends_with: String
  preview_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  placeholder: String
  placeholder_not: String
  placeholder_in: [String!]
  placeholder_not_in: [String!]
  placeholder_lt: String
  placeholder_lte: String
  placeholder_gt: String
  placeholder_gte: String
  placeholder_contains: String
  placeholder_not_contains: String
  placeholder_starts_with: String
  placeholder_not_starts_with: String
  placeholder_ends_with: String
  placeholder_not_ends_with: String
  published: Boolean
  published_not: Boolean
  amount: Float
  amount_not: Float
  amount_in: [Float!]
  amount_not_in: [Float!]
  amount_lt: Float
  amount_lte: Float
  amount_gt: Float
  amount_gte: Float
  start: Int
  start_not: Int
  start_in: [Int!]
  start_not_in: [Int!]
  start_lt: Int
  start_lte: Int
  start_gt: Int
  start_gte: Int
  type: VideoType
  type_not: VideoType
  type_in: [VideoType!]
  type_not_in: [VideoType!]
  familyId: String
  familyId_not: String
  familyId_in: [String!]
  familyId_not_in: [String!]
  familyId_lt: String
  familyId_lte: String
  familyId_gt: String
  familyId_gte: String
  familyId_contains: String
  familyId_not_contains: String
  familyId_starts_with: String
  familyId_not_starts_with: String
  familyId_ends_with: String
  familyId_not_ends_with: String
  AND: [VideoScalarWhereInput!]
  OR: [VideoScalarWhereInput!]
  NOT: [VideoScalarWhereInput!]
}

type VideoSubscriptionPayload {
  mutation: MutationType!
  node: Video
  updatedFields: [String!]
  previousValues: VideoPreviousValues
}

input VideoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VideoWhereInput
  AND: [VideoSubscriptionWhereInput!]
  OR: [VideoSubscriptionWhereInput!]
  NOT: [VideoSubscriptionWhereInput!]
}

enum VideoType {
  ZODIAC
  PICKACARD
}

input VideoUpdateInput {
  name: String
  title: String
  link: String
  preview: String
  image: String
  placeholder: String
  users: UserUpdateManyWithoutVideosInput
  published: Boolean
  amount: Float
  start: Int
  orderIds: VideoUpdateorderIdsInput
  type: VideoType
  familyId: String
}

input VideoUpdateManyDataInput {
  name: String
  title: String
  link: String
  preview: String
  image: String
  placeholder: String
  published: Boolean
  amount: Float
  start: Int
  orderIds: VideoUpdateorderIdsInput
  type: VideoType
  familyId: String
}

input VideoUpdateManyMutationInput {
  name: String
  title: String
  link: String
  preview: String
  image: String
  placeholder: String
  published: Boolean
  amount: Float
  start: Int
  orderIds: VideoUpdateorderIdsInput
  type: VideoType
  familyId: String
}

input VideoUpdateManyWithoutUsersInput {
  create: [VideoCreateWithoutUsersInput!]
  delete: [VideoWhereUniqueInput!]
  connect: [VideoWhereUniqueInput!]
  disconnect: [VideoWhereUniqueInput!]
  update: [VideoUpdateWithWhereUniqueWithoutUsersInput!]
  upsert: [VideoUpsertWithWhereUniqueWithoutUsersInput!]
  deleteMany: [VideoScalarWhereInput!]
  updateMany: [VideoUpdateManyWithWhereNestedInput!]
}

input VideoUpdateManyWithWhereNestedInput {
  where: VideoScalarWhereInput!
  data: VideoUpdateManyDataInput!
}

input VideoUpdateorderIdsInput {
  set: [String!]
}

input VideoUpdateWithoutUsersDataInput {
  name: String
  title: String
  link: String
  preview: String
  image: String
  placeholder: String
  published: Boolean
  amount: Float
  start: Int
  orderIds: VideoUpdateorderIdsInput
  type: VideoType
  familyId: String
}

input VideoUpdateWithWhereUniqueWithoutUsersInput {
  where: VideoWhereUniqueInput!
  data: VideoUpdateWithoutUsersDataInput!
}

input VideoUpsertWithWhereUniqueWithoutUsersInput {
  where: VideoWhereUniqueInput!
  update: VideoUpdateWithoutUsersDataInput!
  create: VideoCreateWithoutUsersInput!
}

input VideoWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  link: String
  link_not: String
  link_in: [String!]
  link_not_in: [String!]
  link_lt: String
  link_lte: String
  link_gt: String
  link_gte: String
  link_contains: String
  link_not_contains: String
  link_starts_with: String
  link_not_starts_with: String
  link_ends_with: String
  link_not_ends_with: String
  preview: String
  preview_not: String
  preview_in: [String!]
  preview_not_in: [String!]
  preview_lt: String
  preview_lte: String
  preview_gt: String
  preview_gte: String
  preview_contains: String
  preview_not_contains: String
  preview_starts_with: String
  preview_not_starts_with: String
  preview_ends_with: String
  preview_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  placeholder: String
  placeholder_not: String
  placeholder_in: [String!]
  placeholder_not_in: [String!]
  placeholder_lt: String
  placeholder_lte: String
  placeholder_gt: String
  placeholder_gte: String
  placeholder_contains: String
  placeholder_not_contains: String
  placeholder_starts_with: String
  placeholder_not_starts_with: String
  placeholder_ends_with: String
  placeholder_not_ends_with: String
  users_every: UserWhereInput
  users_some: UserWhereInput
  users_none: UserWhereInput
  published: Boolean
  published_not: Boolean
  amount: Float
  amount_not: Float
  amount_in: [Float!]
  amount_not_in: [Float!]
  amount_lt: Float
  amount_lte: Float
  amount_gt: Float
  amount_gte: Float
  start: Int
  start_not: Int
  start_in: [Int!]
  start_not_in: [Int!]
  start_lt: Int
  start_lte: Int
  start_gt: Int
  start_gte: Int
  type: VideoType
  type_not: VideoType
  type_in: [VideoType!]
  type_not_in: [VideoType!]
  familyId: String
  familyId_not: String
  familyId_in: [String!]
  familyId_not_in: [String!]
  familyId_lt: String
  familyId_lte: String
  familyId_gt: String
  familyId_gte: String
  familyId_contains: String
  familyId_not_contains: String
  familyId_starts_with: String
  familyId_not_starts_with: String
  familyId_ends_with: String
  familyId_not_ends_with: String
  AND: [VideoWhereInput!]
  OR: [VideoWhereInput!]
  NOT: [VideoWhereInput!]
}

input VideoWhereUniqueInput {
  id: ID
}
`
      }
    