const { gql } = require("apollo-server-express");

// # ADD TYPE DEFS - SEE README LINE 91 + TYPE DEFS Vs MODELS IN EXAMPLES

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookcount: Int!
    savedBooks: [Book]
  }

  type Book {
    _id: ID!
    authors: [String!]
    description: String
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput { 
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me: User
    book: Book
  }

  type Mutation {
    login(password: String!, email: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(_id: ID!): User
  }

`;

module.exports = typeDefs;
