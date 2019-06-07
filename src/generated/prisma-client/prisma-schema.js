module.exports = {
        typeDefs: /* GraphQL */ `type AggregateOrder {
  count: Int!
}

type AggregatePriceSchedule {
  count: Int!
}

type AggregateProduct {
  count: Int!
}

type AggregatePromoCode {
  count: Int!
}

type AggregatePromoVideo {
  count: Int!
}

type AggregateSitePromo {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateVideo {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createOrder(data: OrderCreateInput!): Order!
  updateOrder(data: OrderUpdateInput!, where: OrderWhereUniqueInput!): Order
  updateManyOrders(data: OrderUpdateManyMutationInput!, where: OrderWhereInput): BatchPayload!
  upsertOrder(where: OrderWhereUniqueInput!, create: OrderCreateInput!, update: OrderUpdateInput!): Order!
  deleteOrder(where: OrderWhereUniqueInput!): Order
  deleteManyOrders(where: OrderWhereInput): BatchPayload!
  createPriceSchedule(data: PriceScheduleCreateInput!): PriceSchedule!
  updatePriceSchedule(data: PriceScheduleUpdateInput!, where: PriceScheduleWhereUniqueInput!): PriceSchedule
  updateManyPriceSchedules(data: PriceScheduleUpdateManyMutationInput!, where: PriceScheduleWhereInput): BatchPayload!
  upsertPriceSchedule(where: PriceScheduleWhereUniqueInput!, create: PriceScheduleCreateInput!, update: PriceScheduleUpdateInput!): PriceSchedule!
  deletePriceSchedule(where: PriceScheduleWhereUniqueInput!): PriceSchedule
  deleteManyPriceSchedules(where: PriceScheduleWhereInput): BatchPayload!
  createProduct(data: ProductCreateInput!): Product!
  updateProduct(data: ProductUpdateInput!, where: ProductWhereUniqueInput!): Product
  updateManyProducts(data: ProductUpdateManyMutationInput!, where: ProductWhereInput): BatchPayload!
  upsertProduct(where: ProductWhereUniqueInput!, create: ProductCreateInput!, update: ProductUpdateInput!): Product!
  deleteProduct(where: ProductWhereUniqueInput!): Product
  deleteManyProducts(where: ProductWhereInput): BatchPayload!
  createPromoCode(data: PromoCodeCreateInput!): PromoCode!
  updatePromoCode(data: PromoCodeUpdateInput!, where: PromoCodeWhereUniqueInput!): PromoCode
  updateManyPromoCodes(data: PromoCodeUpdateManyMutationInput!, where: PromoCodeWhereInput): BatchPayload!
  upsertPromoCode(where: PromoCodeWhereUniqueInput!, create: PromoCodeCreateInput!, update: PromoCodeUpdateInput!): PromoCode!
  deletePromoCode(where: PromoCodeWhereUniqueInput!): PromoCode
  deleteManyPromoCodes(where: PromoCodeWhereInput): BatchPayload!
  createPromoVideo(data: PromoVideoCreateInput!): PromoVideo!
  updatePromoVideo(data: PromoVideoUpdateInput!, where: PromoVideoWhereUniqueInput!): PromoVideo
  updateManyPromoVideos(data: PromoVideoUpdateManyMutationInput!, where: PromoVideoWhereInput): BatchPayload!
  upsertPromoVideo(where: PromoVideoWhereUniqueInput!, create: PromoVideoCreateInput!, update: PromoVideoUpdateInput!): PromoVideo!
  deletePromoVideo(where: PromoVideoWhereUniqueInput!): PromoVideo
  deleteManyPromoVideos(where: PromoVideoWhereInput): BatchPayload!
  createSitePromo(data: SitePromoCreateInput!): SitePromo!
  updateSitePromo(data: SitePromoUpdateInput!, where: SitePromoWhereUniqueInput!): SitePromo
  updateManySitePromoes(data: SitePromoUpdateManyMutationInput!, where: SitePromoWhereInput): BatchPayload!
  upsertSitePromo(where: SitePromoWhereUniqueInput!, create: SitePromoCreateInput!, update: SitePromoUpdateInput!): SitePromo!
  deleteSitePromo(where: SitePromoWhereUniqueInput!): SitePromo
  deleteManySitePromoes(where: SitePromoWhereInput): BatchPayload!
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

type Order {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  paymentId: String!
  user: User
  video: Video
}

type OrderConnection {
  pageInfo: PageInfo!
  edges: [OrderEdge]!
  aggregate: AggregateOrder!
}

input OrderCreateInput {
  paymentId: String!
  user: UserCreateOneWithoutOrdersInput
  video: VideoCreateOneInput
}

input OrderCreateManyWithoutUserInput {
  create: [OrderCreateWithoutUserInput!]
  connect: [OrderWhereUniqueInput!]
}

input OrderCreateWithoutUserInput {
  paymentId: String!
  video: VideoCreateOneInput
}

type OrderEdge {
  node: Order!
  cursor: String!
}

enum OrderOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  paymentId_ASC
  paymentId_DESC
}

type OrderPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  paymentId: String!
}

input OrderScalarWhereInput {
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
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  paymentId: String
  paymentId_not: String
  paymentId_in: [String!]
  paymentId_not_in: [String!]
  paymentId_lt: String
  paymentId_lte: String
  paymentId_gt: String
  paymentId_gte: String
  paymentId_contains: String
  paymentId_not_contains: String
  paymentId_starts_with: String
  paymentId_not_starts_with: String
  paymentId_ends_with: String
  paymentId_not_ends_with: String
  AND: [OrderScalarWhereInput!]
  OR: [OrderScalarWhereInput!]
  NOT: [OrderScalarWhereInput!]
}

type OrderSubscriptionPayload {
  mutation: MutationType!
  node: Order
  updatedFields: [String!]
  previousValues: OrderPreviousValues
}

input OrderSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: OrderWhereInput
  AND: [OrderSubscriptionWhereInput!]
  OR: [OrderSubscriptionWhereInput!]
  NOT: [OrderSubscriptionWhereInput!]
}

input OrderUpdateInput {
  paymentId: String
  user: UserUpdateOneWithoutOrdersInput
  video: VideoUpdateOneInput
}

input OrderUpdateManyDataInput {
  paymentId: String
}

input OrderUpdateManyMutationInput {
  paymentId: String
}

input OrderUpdateManyWithoutUserInput {
  create: [OrderCreateWithoutUserInput!]
  delete: [OrderWhereUniqueInput!]
  connect: [OrderWhereUniqueInput!]
  disconnect: [OrderWhereUniqueInput!]
  update: [OrderUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [OrderUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [OrderScalarWhereInput!]
  updateMany: [OrderUpdateManyWithWhereNestedInput!]
}

input OrderUpdateManyWithWhereNestedInput {
  where: OrderScalarWhereInput!
  data: OrderUpdateManyDataInput!
}

input OrderUpdateWithoutUserDataInput {
  paymentId: String
  video: VideoUpdateOneInput
}

input OrderUpdateWithWhereUniqueWithoutUserInput {
  where: OrderWhereUniqueInput!
  data: OrderUpdateWithoutUserDataInput!
}

input OrderUpsertWithWhereUniqueWithoutUserInput {
  where: OrderWhereUniqueInput!
  update: OrderUpdateWithoutUserDataInput!
  create: OrderCreateWithoutUserInput!
}

input OrderWhereInput {
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
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  paymentId: String
  paymentId_not: String
  paymentId_in: [String!]
  paymentId_not_in: [String!]
  paymentId_lt: String
  paymentId_lte: String
  paymentId_gt: String
  paymentId_gte: String
  paymentId_contains: String
  paymentId_not_contains: String
  paymentId_starts_with: String
  paymentId_not_starts_with: String
  paymentId_ends_with: String
  paymentId_not_ends_with: String
  user: UserWhereInput
  video: VideoWhereInput
  AND: [OrderWhereInput!]
  OR: [OrderWhereInput!]
  NOT: [OrderWhereInput!]
}

input OrderWhereUniqueInput {
  id: ID
  paymentId: String
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type PriceSchedule {
  id: ID!
  price: Float!
  startDate: String!
  endDate: String!
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video!]
}

type PriceScheduleConnection {
  pageInfo: PageInfo!
  edges: [PriceScheduleEdge]!
  aggregate: AggregatePriceSchedule!
}

input PriceScheduleCreateInput {
  price: Float!
  startDate: String!
  endDate: String!
  videos: VideoCreateManyWithoutPriceScheduleInput
}

input PriceScheduleCreateManyWithoutVideosInput {
  create: [PriceScheduleCreateWithoutVideosInput!]
  connect: [PriceScheduleWhereUniqueInput!]
}

input PriceScheduleCreateWithoutVideosInput {
  price: Float!
  startDate: String!
  endDate: String!
}

type PriceScheduleEdge {
  node: PriceSchedule!
  cursor: String!
}

enum PriceScheduleOrderByInput {
  id_ASC
  id_DESC
  price_ASC
  price_DESC
  startDate_ASC
  startDate_DESC
  endDate_ASC
  endDate_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PriceSchedulePreviousValues {
  id: ID!
  price: Float!
  startDate: String!
  endDate: String!
}

input PriceScheduleScalarWhereInput {
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
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
  startDate: String
  startDate_not: String
  startDate_in: [String!]
  startDate_not_in: [String!]
  startDate_lt: String
  startDate_lte: String
  startDate_gt: String
  startDate_gte: String
  startDate_contains: String
  startDate_not_contains: String
  startDate_starts_with: String
  startDate_not_starts_with: String
  startDate_ends_with: String
  startDate_not_ends_with: String
  endDate: String
  endDate_not: String
  endDate_in: [String!]
  endDate_not_in: [String!]
  endDate_lt: String
  endDate_lte: String
  endDate_gt: String
  endDate_gte: String
  endDate_contains: String
  endDate_not_contains: String
  endDate_starts_with: String
  endDate_not_starts_with: String
  endDate_ends_with: String
  endDate_not_ends_with: String
  AND: [PriceScheduleScalarWhereInput!]
  OR: [PriceScheduleScalarWhereInput!]
  NOT: [PriceScheduleScalarWhereInput!]
}

type PriceScheduleSubscriptionPayload {
  mutation: MutationType!
  node: PriceSchedule
  updatedFields: [String!]
  previousValues: PriceSchedulePreviousValues
}

input PriceScheduleSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PriceScheduleWhereInput
  AND: [PriceScheduleSubscriptionWhereInput!]
  OR: [PriceScheduleSubscriptionWhereInput!]
  NOT: [PriceScheduleSubscriptionWhereInput!]
}

input PriceScheduleUpdateInput {
  price: Float
  startDate: String
  endDate: String
  videos: VideoUpdateManyWithoutPriceScheduleInput
}

input PriceScheduleUpdateManyDataInput {
  price: Float
  startDate: String
  endDate: String
}

input PriceScheduleUpdateManyMutationInput {
  price: Float
  startDate: String
  endDate: String
}

input PriceScheduleUpdateManyWithoutVideosInput {
  create: [PriceScheduleCreateWithoutVideosInput!]
  delete: [PriceScheduleWhereUniqueInput!]
  connect: [PriceScheduleWhereUniqueInput!]
  disconnect: [PriceScheduleWhereUniqueInput!]
  update: [PriceScheduleUpdateWithWhereUniqueWithoutVideosInput!]
  upsert: [PriceScheduleUpsertWithWhereUniqueWithoutVideosInput!]
  deleteMany: [PriceScheduleScalarWhereInput!]
  updateMany: [PriceScheduleUpdateManyWithWhereNestedInput!]
}

input PriceScheduleUpdateManyWithWhereNestedInput {
  where: PriceScheduleScalarWhereInput!
  data: PriceScheduleUpdateManyDataInput!
}

input PriceScheduleUpdateWithoutVideosDataInput {
  price: Float
  startDate: String
  endDate: String
}

input PriceScheduleUpdateWithWhereUniqueWithoutVideosInput {
  where: PriceScheduleWhereUniqueInput!
  data: PriceScheduleUpdateWithoutVideosDataInput!
}

input PriceScheduleUpsertWithWhereUniqueWithoutVideosInput {
  where: PriceScheduleWhereUniqueInput!
  update: PriceScheduleUpdateWithoutVideosDataInput!
  create: PriceScheduleCreateWithoutVideosInput!
}

input PriceScheduleWhereInput {
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
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
  startDate: String
  startDate_not: String
  startDate_in: [String!]
  startDate_not_in: [String!]
  startDate_lt: String
  startDate_lte: String
  startDate_gt: String
  startDate_gte: String
  startDate_contains: String
  startDate_not_contains: String
  startDate_starts_with: String
  startDate_not_starts_with: String
  startDate_ends_with: String
  startDate_not_ends_with: String
  endDate: String
  endDate_not: String
  endDate_in: [String!]
  endDate_not_in: [String!]
  endDate_lt: String
  endDate_lte: String
  endDate_gt: String
  endDate_gte: String
  endDate_contains: String
  endDate_not_contains: String
  endDate_starts_with: String
  endDate_not_starts_with: String
  endDate_ends_with: String
  endDate_not_ends_with: String
  videos_every: VideoWhereInput
  videos_some: VideoWhereInput
  videos_none: VideoWhereInput
  AND: [PriceScheduleWhereInput!]
  OR: [PriceScheduleWhereInput!]
  NOT: [PriceScheduleWhereInput!]
}

input PriceScheduleWhereUniqueInput {
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

type PromoCode {
  id: ID!
  code: String!
  valid: Boolean!
  type: VideoType!
  endDate: String
  user: User!
  video: Video
}

type PromoCodeConnection {
  pageInfo: PageInfo!
  edges: [PromoCodeEdge]!
  aggregate: AggregatePromoCode!
}

input PromoCodeCreateInput {
  code: String!
  valid: Boolean
  type: VideoType!
  endDate: String
  user: UserCreateOneInput!
  video: VideoCreateOneInput
}

type PromoCodeEdge {
  node: PromoCode!
  cursor: String!
}

enum PromoCodeOrderByInput {
  id_ASC
  id_DESC
  code_ASC
  code_DESC
  valid_ASC
  valid_DESC
  type_ASC
  type_DESC
  endDate_ASC
  endDate_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PromoCodePreviousValues {
  id: ID!
  code: String!
  valid: Boolean!
  type: VideoType!
  endDate: String
}

type PromoCodeSubscriptionPayload {
  mutation: MutationType!
  node: PromoCode
  updatedFields: [String!]
  previousValues: PromoCodePreviousValues
}

input PromoCodeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PromoCodeWhereInput
  AND: [PromoCodeSubscriptionWhereInput!]
  OR: [PromoCodeSubscriptionWhereInput!]
  NOT: [PromoCodeSubscriptionWhereInput!]
}

input PromoCodeUpdateInput {
  code: String
  valid: Boolean
  type: VideoType
  endDate: String
  user: UserUpdateOneRequiredInput
  video: VideoUpdateOneInput
}

input PromoCodeUpdateManyMutationInput {
  code: String
  valid: Boolean
  type: VideoType
  endDate: String
}

input PromoCodeWhereInput {
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
  code: String
  code_not: String
  code_in: [String!]
  code_not_in: [String!]
  code_lt: String
  code_lte: String
  code_gt: String
  code_gte: String
  code_contains: String
  code_not_contains: String
  code_starts_with: String
  code_not_starts_with: String
  code_ends_with: String
  code_not_ends_with: String
  valid: Boolean
  valid_not: Boolean
  type: VideoType
  type_not: VideoType
  type_in: [VideoType!]
  type_not_in: [VideoType!]
  endDate: String
  endDate_not: String
  endDate_in: [String!]
  endDate_not_in: [String!]
  endDate_lt: String
  endDate_lte: String
  endDate_gt: String
  endDate_gte: String
  endDate_contains: String
  endDate_not_contains: String
  endDate_starts_with: String
  endDate_not_starts_with: String
  endDate_ends_with: String
  endDate_not_ends_with: String
  user: UserWhereInput
  video: VideoWhereInput
  AND: [PromoCodeWhereInput!]
  OR: [PromoCodeWhereInput!]
  NOT: [PromoCodeWhereInput!]
}

input PromoCodeWhereUniqueInput {
  id: ID
  code: String
}

enum PromoOffer {
  BUY1GET1
  BUY2GET1
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
  bannerMobile: String!
  type: VideoType!
  video: Video
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
  bannerMobile: String!
  type: VideoType!
  video: VideoCreateOneWithoutPromoVideoInput
}

input PromoVideoCreateOneWithoutVideoInput {
  create: PromoVideoCreateWithoutVideoInput
  connect: PromoVideoWhereUniqueInput
}

input PromoVideoCreateWithoutVideoInput {
  link: String!
  title: String!
  description: String!
  image: String!
  placeholder: String
  familyId: String
  banner: String!
  bannerMobile: String!
  type: VideoType!
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
  bannerMobile_ASC
  bannerMobile_DESC
  type_ASC
  type_DESC
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
  bannerMobile: String!
  type: VideoType!
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
  bannerMobile: String
  type: VideoType
  video: VideoUpdateOneWithoutPromoVideoInput
}

input PromoVideoUpdateManyMutationInput {
  link: String
  title: String
  description: String
  image: String
  placeholder: String
  familyId: String
  banner: String
  bannerMobile: String
  type: VideoType
}

input PromoVideoUpdateOneWithoutVideoInput {
  create: PromoVideoCreateWithoutVideoInput
  update: PromoVideoUpdateWithoutVideoDataInput
  upsert: PromoVideoUpsertWithoutVideoInput
  delete: Boolean
  disconnect: Boolean
  connect: PromoVideoWhereUniqueInput
}

input PromoVideoUpdateWithoutVideoDataInput {
  link: String
  title: String
  description: String
  image: String
  placeholder: String
  familyId: String
  banner: String
  bannerMobile: String
  type: VideoType
}

input PromoVideoUpsertWithoutVideoInput {
  update: PromoVideoUpdateWithoutVideoDataInput!
  create: PromoVideoCreateWithoutVideoInput!
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
  bannerMobile: String
  bannerMobile_not: String
  bannerMobile_in: [String!]
  bannerMobile_not_in: [String!]
  bannerMobile_lt: String
  bannerMobile_lte: String
  bannerMobile_gt: String
  bannerMobile_gte: String
  bannerMobile_contains: String
  bannerMobile_not_contains: String
  bannerMobile_starts_with: String
  bannerMobile_not_starts_with: String
  bannerMobile_ends_with: String
  bannerMobile_not_ends_with: String
  type: VideoType
  type_not: VideoType
  type_in: [VideoType!]
  type_not_in: [VideoType!]
  video: VideoWhereInput
  AND: [PromoVideoWhereInput!]
  OR: [PromoVideoWhereInput!]
  NOT: [PromoVideoWhereInput!]
}

input PromoVideoWhereUniqueInput {
  id: ID
}

type Query {
  order(where: OrderWhereUniqueInput!): Order
  orders(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Order]!
  ordersConnection(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrderConnection!
  priceSchedule(where: PriceScheduleWhereUniqueInput!): PriceSchedule
  priceSchedules(where: PriceScheduleWhereInput, orderBy: PriceScheduleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PriceSchedule]!
  priceSchedulesConnection(where: PriceScheduleWhereInput, orderBy: PriceScheduleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PriceScheduleConnection!
  product(where: ProductWhereUniqueInput!): Product
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product]!
  productsConnection(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProductConnection!
  promoCode(where: PromoCodeWhereUniqueInput!): PromoCode
  promoCodes(where: PromoCodeWhereInput, orderBy: PromoCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PromoCode]!
  promoCodesConnection(where: PromoCodeWhereInput, orderBy: PromoCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PromoCodeConnection!
  promoVideo(where: PromoVideoWhereUniqueInput!): PromoVideo
  promoVideos(where: PromoVideoWhereInput, orderBy: PromoVideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PromoVideo]!
  promoVideosConnection(where: PromoVideoWhereInput, orderBy: PromoVideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PromoVideoConnection!
  sitePromo(where: SitePromoWhereUniqueInput!): SitePromo
  sitePromoes(where: SitePromoWhereInput, orderBy: SitePromoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SitePromo]!
  sitePromoesConnection(where: SitePromoWhereInput, orderBy: SitePromoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SitePromoConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  video(where: VideoWhereUniqueInput!): Video
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video]!
  videosConnection(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoConnection!
  node(id: ID!): Node
}

type SitePromo {
  id: ID!
  type: VideoType!
  promoOffer: PromoOffer!
  startDate: String
  endDate: String
}

type SitePromoConnection {
  pageInfo: PageInfo!
  edges: [SitePromoEdge]!
  aggregate: AggregateSitePromo!
}

input SitePromoCreateInput {
  type: VideoType!
  promoOffer: PromoOffer!
  startDate: String
  endDate: String
}

type SitePromoEdge {
  node: SitePromo!
  cursor: String!
}

enum SitePromoOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  promoOffer_ASC
  promoOffer_DESC
  startDate_ASC
  startDate_DESC
  endDate_ASC
  endDate_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SitePromoPreviousValues {
  id: ID!
  type: VideoType!
  promoOffer: PromoOffer!
  startDate: String
  endDate: String
}

type SitePromoSubscriptionPayload {
  mutation: MutationType!
  node: SitePromo
  updatedFields: [String!]
  previousValues: SitePromoPreviousValues
}

input SitePromoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SitePromoWhereInput
  AND: [SitePromoSubscriptionWhereInput!]
  OR: [SitePromoSubscriptionWhereInput!]
  NOT: [SitePromoSubscriptionWhereInput!]
}

input SitePromoUpdateInput {
  type: VideoType
  promoOffer: PromoOffer
  startDate: String
  endDate: String
}

input SitePromoUpdateManyMutationInput {
  type: VideoType
  promoOffer: PromoOffer
  startDate: String
  endDate: String
}

input SitePromoWhereInput {
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
  type: VideoType
  type_not: VideoType
  type_in: [VideoType!]
  type_not_in: [VideoType!]
  promoOffer: PromoOffer
  promoOffer_not: PromoOffer
  promoOffer_in: [PromoOffer!]
  promoOffer_not_in: [PromoOffer!]
  startDate: String
  startDate_not: String
  startDate_in: [String!]
  startDate_not_in: [String!]
  startDate_lt: String
  startDate_lte: String
  startDate_gt: String
  startDate_gte: String
  startDate_contains: String
  startDate_not_contains: String
  startDate_starts_with: String
  startDate_not_starts_with: String
  startDate_ends_with: String
  startDate_not_ends_with: String
  endDate: String
  endDate_not: String
  endDate_in: [String!]
  endDate_not_in: [String!]
  endDate_lt: String
  endDate_lte: String
  endDate_gt: String
  endDate_gte: String
  endDate_contains: String
  endDate_not_contains: String
  endDate_starts_with: String
  endDate_not_starts_with: String
  endDate_ends_with: String
  endDate_not_ends_with: String
  AND: [SitePromoWhereInput!]
  OR: [SitePromoWhereInput!]
  NOT: [SitePromoWhereInput!]
}

input SitePromoWhereUniqueInput {
  id: ID
}

type Subscription {
  order(where: OrderSubscriptionWhereInput): OrderSubscriptionPayload
  priceSchedule(where: PriceScheduleSubscriptionWhereInput): PriceScheduleSubscriptionPayload
  product(where: ProductSubscriptionWhereInput): ProductSubscriptionPayload
  promoCode(where: PromoCodeSubscriptionWhereInput): PromoCodeSubscriptionPayload
  promoVideo(where: PromoVideoSubscriptionWhereInput): PromoVideoSubscriptionPayload
  sitePromo(where: SitePromoSubscriptionWhereInput): SitePromoSubscriptionPayload
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
  active: Boolean!
  orders(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Order!]
  createdAt: DateTime!
  updatedAt: DateTime!
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
  active: Boolean
  orders: OrderCreateManyWithoutUserInput
}

input UserCreateipsInput {
  set: [String!]
}

input UserCreateManyWithoutVideosInput {
  create: [UserCreateWithoutVideosInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutOrdersInput {
  create: UserCreateWithoutOrdersInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutOrdersInput {
  firstName: String
  lastName: String
  email: String!
  phone: String
  ips: UserCreateipsInput
  subscribed: Boolean
  videos: VideoCreateManyWithoutUsersInput
  active: Boolean
}

input UserCreateWithoutVideosInput {
  firstName: String
  lastName: String
  email: String!
  phone: String
  ips: UserCreateipsInput
  subscribed: Boolean
  active: Boolean
  orders: OrderCreateManyWithoutUserInput
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
  active_ASC
  active_DESC
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
  active: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
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
  active: Boolean
  active_not: Boolean
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
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

input UserUpdateDataInput {
  firstName: String
  lastName: String
  email: String
  phone: String
  ips: UserUpdateipsInput
  subscribed: Boolean
  videos: VideoUpdateManyWithoutUsersInput
  active: Boolean
  orders: OrderUpdateManyWithoutUserInput
}

input UserUpdateInput {
  firstName: String
  lastName: String
  email: String
  phone: String
  ips: UserUpdateipsInput
  subscribed: Boolean
  videos: VideoUpdateManyWithoutUsersInput
  active: Boolean
  orders: OrderUpdateManyWithoutUserInput
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
  active: Boolean
}

input UserUpdateManyMutationInput {
  firstName: String
  lastName: String
  email: String
  phone: String
  ips: UserUpdateipsInput
  subscribed: Boolean
  active: Boolean
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

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutOrdersInput {
  create: UserCreateWithoutOrdersInput
  update: UserUpdateWithoutOrdersDataInput
  upsert: UserUpsertWithoutOrdersInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutOrdersDataInput {
  firstName: String
  lastName: String
  email: String
  phone: String
  ips: UserUpdateipsInput
  subscribed: Boolean
  videos: VideoUpdateManyWithoutUsersInput
  active: Boolean
}

input UserUpdateWithoutVideosDataInput {
  firstName: String
  lastName: String
  email: String
  phone: String
  ips: UserUpdateipsInput
  subscribed: Boolean
  active: Boolean
  orders: OrderUpdateManyWithoutUserInput
}

input UserUpdateWithWhereUniqueWithoutVideosInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutVideosDataInput!
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutOrdersInput {
  update: UserUpdateWithoutOrdersDataInput!
  create: UserCreateWithoutOrdersInput!
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
  active: Boolean
  active_not: Boolean
  orders_every: OrderWhereInput
  orders_some: OrderWhereInput
  orders_none: OrderWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
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
  price: Float!
  priceSchedule(where: PriceScheduleWhereInput, orderBy: PriceScheduleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PriceSchedule!]
  start: Int!
  type: VideoType!
  familyId: String
  promoVideo: PromoVideo
  suggest: Boolean!
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
  price: Float!
  priceSchedule: PriceScheduleCreateManyWithoutVideosInput
  start: Int!
  type: VideoType!
  familyId: String
  promoVideo: PromoVideoCreateOneWithoutVideoInput
  suggest: Boolean
}

input VideoCreateManyWithoutPriceScheduleInput {
  create: [VideoCreateWithoutPriceScheduleInput!]
  connect: [VideoWhereUniqueInput!]
}

input VideoCreateManyWithoutUsersInput {
  create: [VideoCreateWithoutUsersInput!]
  connect: [VideoWhereUniqueInput!]
}

input VideoCreateOneInput {
  create: VideoCreateInput
  connect: VideoWhereUniqueInput
}

input VideoCreateOneWithoutPromoVideoInput {
  create: VideoCreateWithoutPromoVideoInput
  connect: VideoWhereUniqueInput
}

input VideoCreateWithoutPriceScheduleInput {
  name: String!
  title: String
  link: String!
  preview: String!
  image: String!
  placeholder: String
  users: UserCreateManyWithoutVideosInput
  published: Boolean
  price: Float!
  start: Int!
  type: VideoType!
  familyId: String
  promoVideo: PromoVideoCreateOneWithoutVideoInput
  suggest: Boolean
}

input VideoCreateWithoutPromoVideoInput {
  name: String!
  title: String
  link: String!
  preview: String!
  image: String!
  placeholder: String
  users: UserCreateManyWithoutVideosInput
  published: Boolean
  price: Float!
  priceSchedule: PriceScheduleCreateManyWithoutVideosInput
  start: Int!
  type: VideoType!
  familyId: String
  suggest: Boolean
}

input VideoCreateWithoutUsersInput {
  name: String!
  title: String
  link: String!
  preview: String!
  image: String!
  placeholder: String
  published: Boolean
  price: Float!
  priceSchedule: PriceScheduleCreateManyWithoutVideosInput
  start: Int!
  type: VideoType!
  familyId: String
  promoVideo: PromoVideoCreateOneWithoutVideoInput
  suggest: Boolean
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
  price_ASC
  price_DESC
  start_ASC
  start_DESC
  type_ASC
  type_DESC
  familyId_ASC
  familyId_DESC
  suggest_ASC
  suggest_DESC
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
  price: Float!
  start: Int!
  type: VideoType!
  familyId: String
  suggest: Boolean!
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
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
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
  suggest: Boolean
  suggest_not: Boolean
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

input VideoUpdateDataInput {
  name: String
  title: String
  link: String
  preview: String
  image: String
  placeholder: String
  users: UserUpdateManyWithoutVideosInput
  published: Boolean
  price: Float
  priceSchedule: PriceScheduleUpdateManyWithoutVideosInput
  start: Int
  type: VideoType
  familyId: String
  promoVideo: PromoVideoUpdateOneWithoutVideoInput
  suggest: Boolean
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
  price: Float
  priceSchedule: PriceScheduleUpdateManyWithoutVideosInput
  start: Int
  type: VideoType
  familyId: String
  promoVideo: PromoVideoUpdateOneWithoutVideoInput
  suggest: Boolean
}

input VideoUpdateManyDataInput {
  name: String
  title: String
  link: String
  preview: String
  image: String
  placeholder: String
  published: Boolean
  price: Float
  start: Int
  type: VideoType
  familyId: String
  suggest: Boolean
}

input VideoUpdateManyMutationInput {
  name: String
  title: String
  link: String
  preview: String
  image: String
  placeholder: String
  published: Boolean
  price: Float
  start: Int
  type: VideoType
  familyId: String
  suggest: Boolean
}

input VideoUpdateManyWithoutPriceScheduleInput {
  create: [VideoCreateWithoutPriceScheduleInput!]
  delete: [VideoWhereUniqueInput!]
  connect: [VideoWhereUniqueInput!]
  disconnect: [VideoWhereUniqueInput!]
  update: [VideoUpdateWithWhereUniqueWithoutPriceScheduleInput!]
  upsert: [VideoUpsertWithWhereUniqueWithoutPriceScheduleInput!]
  deleteMany: [VideoScalarWhereInput!]
  updateMany: [VideoUpdateManyWithWhereNestedInput!]
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

input VideoUpdateOneInput {
  create: VideoCreateInput
  update: VideoUpdateDataInput
  upsert: VideoUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: VideoWhereUniqueInput
}

input VideoUpdateOneWithoutPromoVideoInput {
  create: VideoCreateWithoutPromoVideoInput
  update: VideoUpdateWithoutPromoVideoDataInput
  upsert: VideoUpsertWithoutPromoVideoInput
  delete: Boolean
  disconnect: Boolean
  connect: VideoWhereUniqueInput
}

input VideoUpdateWithoutPriceScheduleDataInput {
  name: String
  title: String
  link: String
  preview: String
  image: String
  placeholder: String
  users: UserUpdateManyWithoutVideosInput
  published: Boolean
  price: Float
  start: Int
  type: VideoType
  familyId: String
  promoVideo: PromoVideoUpdateOneWithoutVideoInput
  suggest: Boolean
}

input VideoUpdateWithoutPromoVideoDataInput {
  name: String
  title: String
  link: String
  preview: String
  image: String
  placeholder: String
  users: UserUpdateManyWithoutVideosInput
  published: Boolean
  price: Float
  priceSchedule: PriceScheduleUpdateManyWithoutVideosInput
  start: Int
  type: VideoType
  familyId: String
  suggest: Boolean
}

input VideoUpdateWithoutUsersDataInput {
  name: String
  title: String
  link: String
  preview: String
  image: String
  placeholder: String
  published: Boolean
  price: Float
  priceSchedule: PriceScheduleUpdateManyWithoutVideosInput
  start: Int
  type: VideoType
  familyId: String
  promoVideo: PromoVideoUpdateOneWithoutVideoInput
  suggest: Boolean
}

input VideoUpdateWithWhereUniqueWithoutPriceScheduleInput {
  where: VideoWhereUniqueInput!
  data: VideoUpdateWithoutPriceScheduleDataInput!
}

input VideoUpdateWithWhereUniqueWithoutUsersInput {
  where: VideoWhereUniqueInput!
  data: VideoUpdateWithoutUsersDataInput!
}

input VideoUpsertNestedInput {
  update: VideoUpdateDataInput!
  create: VideoCreateInput!
}

input VideoUpsertWithoutPromoVideoInput {
  update: VideoUpdateWithoutPromoVideoDataInput!
  create: VideoCreateWithoutPromoVideoInput!
}

input VideoUpsertWithWhereUniqueWithoutPriceScheduleInput {
  where: VideoWhereUniqueInput!
  update: VideoUpdateWithoutPriceScheduleDataInput!
  create: VideoCreateWithoutPriceScheduleInput!
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
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
  priceSchedule_every: PriceScheduleWhereInput
  priceSchedule_some: PriceScheduleWhereInput
  priceSchedule_none: PriceScheduleWhereInput
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
  promoVideo: PromoVideoWhereInput
  suggest: Boolean
  suggest_not: Boolean
  AND: [VideoWhereInput!]
  OR: [VideoWhereInput!]
  NOT: [VideoWhereInput!]
}

input VideoWhereUniqueInput {
  id: ID
}
`
      }
    