import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { useMemo } from 'react';

const link = createUploadLink({
  uri: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/graphql' : '',
  credentials: 'include',
});

const createApolloClient = () =>
  new ApolloClient({
    link: link as any,
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
