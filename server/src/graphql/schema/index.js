
exports.typeDefs= ` 
type User {
  _id: ID!
  email: String!
  password: String
  createdEvents: [Event!]
}
type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  creator: User!
}
input EventInput {
  title: String!
  description: String!
  price: Float!
  date: String!
}
type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}
input UserInput {
  email: String!
  password: String!
}
type Query {
  events: [Event!]!
  login(email: String!, password: String!): AuthData!  
}
type Mutation {  
  createUser(userInput: UserInput): User    
  addEvent(eventInput: EventInput): Event
}
`;
 