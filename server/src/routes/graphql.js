 const router = require('express').Router()
 const graphqlHTTP = require('express-graphql')
const util = require('../util/util') 
const { makeExecutableSchema } = require("graphql-tools"); 
const { typeDefs } = require("../graphql/schema");
const { resolvers } = require("../graphql/resolvers");
 
// Create schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
 
});
 

router.get('/', graphqlHTTP({
  schema,
  graphiql: !util.isProduction()
}))

router.post('/', graphqlHTTP({
  schema,
  graphiql: false
}))

module.exports = router
