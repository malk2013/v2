const graphql = require('./graphql')
const express = require('express')

module.exports = class Routes {
    
    /**
     * Applies the routes to specific paths
     * @param {*} app - The instance of express which will be serving requests.
     */
    constructor(app) {
        //Throws if no instance of express was passed
        if (app == null) throw new Error("You must provide an instance of express")

        //Registers the base GraphQLi base endpoint
        app.use('/graphql', graphql)
    }

}

/*const { graphiqlExpress, graphqlExpress  } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { typeDefs } = require("../graphql/schema");
const { resolvers } = require("../graphql/resolvers");

// Create schema
const schema =  makeExecutableSchema({
  typeDefs,
  resolvers
});
 
module.exports = class Routes {   
    
    constructor(app) {
        //Throws if no instance of express was passed
        if (app == null) throw new Error("You must provide an instance of express")      
          app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}));
          app.use('/graphql',graphqlExpress({
              schema
          }));

    }

}
*/