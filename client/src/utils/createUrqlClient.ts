import { cacheExchange } from '@urql/exchange-graphcache';
import { MeDocument } from 'src/generated/graphql';
import { dedupExchange, fetchExchange } from 'urql';

export const createUrqlClient = (ssrExchange: any) => ({
  url:
    process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL ||
    'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
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
          logout: (_result, _args, cache, _info) => {
            cache.updateQuery({ query: MeDocument }, data => {
              if (data !== null) {
                data.me = null;
              }

              return data;
            });
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
