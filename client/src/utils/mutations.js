import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $email: String!) {
    login(username: $username, email: $email) {
      _id
      username
      email
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($_id: String!, $username: String!, $email: String!, $password: String!) {
    createUser(_id: $_id, username: $username, email: $email, password: $password) {
        _id
      username
      email
      password
    }
  }
`;


export const SAVE_BOOK = gql`
  mutation saveBook($_id: String!, $bookId: String!) {
    saveBook(_id: $_id, bookId: $bookId) {
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


export const REMOVE_BOOK = gql`
  mutation removeBook($_id: String!, $bookId: String!) {
    deleteBook(_id: $_id, bookId: $bookId) {
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
