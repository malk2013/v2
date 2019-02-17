const _ = require('lodash');
const eventsResolver = require('./events');
const authResolver = require('./auth') ;
const resolvers = {};
 
const rootResolver = _.merge(resolvers,eventsResolver,authResolver);

module.exports = rootResolver;