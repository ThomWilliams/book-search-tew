const { gql } = require('apollo-server-express');



// # ADD TYPE DEFS - SEE README LINE 91 + TYPE DEFS Vs MODELS IN EXAMPLES

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [bookSchema]
  }

  type Book {
    _id: ID!
    authors: String!
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
    getSingleUser:(_id: String!, username: String!): User
    createUser(_id: String!, username: String!, email: String!, password: String!): Auth
    login(username: String!, email: String!): Auth
    saveBook(_id: String!, bookId: String!): User
    deleteBook:(_id: String!, bookId: String!): User
  }

`;

module.exports = typeDefs;