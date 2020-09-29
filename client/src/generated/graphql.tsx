import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  posts: Array<Post>;
  post?: Maybe<Post>;
};

export type QueryPostArgs = {
  uid: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  uid: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  views: Scalars['Float'];
  isPublished: Scalars['Boolean'];
  isEdited: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  updatePost: Post;
  deletePost: Scalars['Boolean'];
  register: User;
  login: User;
};

export type MutationCreatePostArgs = {
  content: Scalars['String'];
  title: Scalars['String'];
};

export type MutationUpdatePostArgs = {
  content: Scalars['String'];
  title: Scalars['String'];
  uid: Scalars['String'];
};

export type MutationDeletePostArgs = {
  uid: Scalars['String'];
};

export type MutationRegisterArgs = {
  options: UserRegistrationInput;
};

export type MutationLoginArgs = {
  options: UserLoginInput;
};

export type User = {
  __typename?: 'User';
  uid: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserRegistrationInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  options: UserLoginInput;
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'User' } & Pick<
    User,
    | 'uid'
    | 'username'
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'createdAt'
    | 'updatedAt'
  >;
};

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'User' } & Pick<
    User,
    'uid' | 'username' | 'email' | 'createdAt' | 'updatedAt'
  >;
};

export const LoginDocument = gql`
  mutation Login($options: UserLoginInput!) {
    login(options: $options) {
      uid
      username
      email
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const RegisterDocument = gql`
  mutation Register($email: String!, $password: String!, $username: String!) {
    register(
      options: { email: $email, password: $password, username: $username }
    ) {
      uid
      username
      email
      createdAt
      updatedAt
    }
  }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
