import { FetchPostsResponse } from './../generated/graphql';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const link = createUploadLink({
  uri: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/graphql' : '',
  credentials: 'include',
});

export const createApolloClient = () =>
  new ApolloClient({
    link: link as any,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            fetchPosts: {
              keyArgs: false,
              merge(
                existing: FetchPostsResponse | undefined,
                incoming: FetchPostsResponse
              ): FetchPostsResponse {
                return {
                  ...incoming,
                  posts: [...(existing?.posts || []), ...incoming.posts],
                };
              },
            },
          },
        },
      },
    }),
  });
