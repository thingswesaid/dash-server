"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Post",
    embedded: false
  },
  {
    name: "Product",
    embedded: false
  },
  {
    name: "Status",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Video",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://dash-prisma-server.herokuapp.com/`,
  secret: `uhsomesecretyouhaveuh`
});
exports.prisma = new exports.Prisma();
var models = [
  {
    name: "Post",
    embedded: false
  },
  {
    name: "Product",
    embedded: false
  },
  {
    name: "Status",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Video",
    embedded: false
  }
];
