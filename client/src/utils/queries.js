import { gql } from '@apollo/client';

export const GET_ME = gql`
  query user {
    user {
      _id
      username 
      email
      password
    }
  }
`;

export const QUERY_BOOKS = gql`
  query books($_id: String) {
    books(_id: $_id) {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
  }
`;
