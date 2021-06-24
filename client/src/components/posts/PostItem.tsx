import {
  Box,
  Flex,
  Text,
  useToast,
  Link,
  useDisclosure,
  Heading,
} from '@chakra-ui/react';
import React from 'react';
import { FullPostItem } from './FullPostItem';
import { Social } from './common/Social';
import { PostedBy } from './common/PostedBy';
import { MediaCarrousel } from './common/MediaCarrousel';
import { Vote } from './common/Vote';
import { Post, useVoteMutation } from 'src/generated/graphql';

interface PostItemProps {
  post: Partial<Post>;
}

export const PostItem: React.FC<PostItemProps> = ({ post }): JSX.Element => {
  const { id, title, bodySnippet } = post;
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [vote, { loading }] = useVoteMutation();

  const handleVote = async (type: 'upvote' | 'downvote') => {
    try {
      await vote({
        variables: {
          input: {
            postId: parseInt(id!),
            value: type === 'upvote' ? 1 : -1,
          },
        },
      });
    } catch (error: any) {
      toast({
        title: error.message,
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} width='100%' m='10px 0' bg='gray.900'>
      <Flex>
        <Vote handleVote={handleVote} loadingVote={loading} post={post} />
        <Box ml='15px'>
          <Text mb='5px' color='gray.400'>
            <PostedBy post={post} />
          </Text>
          <Heading mb='4px' size='md'>
            {title}
          </Heading>
          <Text>
            {bodySnippet}
            {bodySnippet?.length! >= 50 && (
              <Link
                as='button'
                color='blue.300'
                ml='3px'
                style={{ textDecoration: 'none' }}
                onClick={onOpen}
              >
                ...ver mas
              </Link>
            )}
          </Text>
          <Box mt={4}>
            <MediaCarrousel post={post} />
          </Box>
          <Social onOpen={onOpen} />
        </Box>
      </Flex>
      <FullPostItem
        post={post}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        handleVote={handleVote}
        loadingVote={loading}
      />
    </Box>
  );
};
