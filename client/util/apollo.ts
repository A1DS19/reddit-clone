import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useMemo } from 'react';

const createApolloClient = () =>
  new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/graphql' : '',
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });

export function useApollo() {
  const client = useMemo(() => createApolloClient(), []);
  return client;
}
