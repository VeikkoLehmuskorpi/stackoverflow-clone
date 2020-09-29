import { cacheExchange } from '@urql/exchange-graphcache';
import 'antd/dist/antd.css';
import React from 'react';
import { MeDocument } from 'src/generated/graphql';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';

const client = createClient({
  url:
    process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL ||
    'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (result, _args, cache, _info) => {
            cache.updateQuery({ query: MeDocument }, data => {
              if (data !== null) {
                data.me = result.login;
              }

              return data;
            });
          },
          register: (result, _args, cache, _info) => {
            cache.updateQuery({ query: MeDocument }, data => {
              if (data !== null) {
                data.me = result.register;
              }

              return data;
            });
          },
        },
      },
    }),
    fetchExchange,
  ],
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
