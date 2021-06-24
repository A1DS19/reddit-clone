import React, { useEffect, useState } from 'react';
import { useFetchPostsQuery } from 'src/generated/graphql';
import { PostItem } from './PostItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner, Alert, AlertIcon, Box } from '@chakra-ui/react';

interface PostListProps {}

export const PostList: React.FC<PostListProps> = ({}) => {
  const REQUEST_LIMIT = 2;
  const { data, loading, error, fetchMore, variables } = useFetchPostsQuery({
    variables: {
      limit: REQUEST_LIMIT,
      cursor: null,
    },
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data && loading) {
    return <div>Loading...</div>;
  }

  const renderPosts = () => {
    return data?.fetchPosts?.posts.map((post) => {
      return <PostItem key={post.id} post={post} />;
    });
  };

  return (
    <InfiniteScroll
      dataLength={data?.fetchPosts?.posts.length as number}
      next={() =>
        fetchMore({
          variables: {
            limit: variables?.limit,
            cursor:
              data?.fetchPosts?.posts[data?.fetchPosts?.posts?.length - 1]?.createdAt,
          },
        })
      }
      hasMore={data?.fetchPosts?.hasMore as boolean}
      loader={
        <Box textAlign='center'>
          <Spinner />
        </Box>
      }
      endMessage={
        <Alert mt={4} status='info'>
          <AlertIcon />
          Ya no hay mas posts :(
        </Alert>
      }
    >
      {renderPosts()}
    </InfiniteScroll>
  );
};
