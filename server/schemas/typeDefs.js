const { gql } = require('apollo-server-express');



// # ADD TYPE DEFS - SEE README LINE 91 + TYPE DEFS Vs MODELS IN EXAMPLES

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookcount: Number!
    password: String!
    savedBooks: [Book]
  }

  type Book {
    _id: ID!
    authors: [String!]
    description: String!
    bookId: String!
    image: String!
    link: String!
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: [User]
    book(_id: String): [Book]
  }

  type Mutation {
    login(password: String!, email: String!): Auth
    addUser(_id: String!, username: String!, email: String!, password: String!): Auth
    saveBook(_id: String!, author: String!, description: String!, title: String!, bookId: String!, image: String!, link: String!): User
    removeBook:(_id: String!, bookId: String!): User
  }

`;

module.exports = typeDefs;