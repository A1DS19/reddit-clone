import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Box,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { Post, useFetchPostQuery } from 'src/generated/graphql';
import { Social } from './common/Social';
import { PostedBy } from './common/PostedBy';
import { MediaCarrousel } from './common/MediaCarrousel';
import { Vote } from './common/Vote';
import { CommentForm } from './comments/CommentForm';

interface FullPostItemProps {
  post: Partial<Post>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleVote: (type: 'upvote' | 'downvote') => void;
  loadingVote: boolean;
}

export const FullPostItem: React.FC<FullPostItemProps> = ({
  post,
  isOpen,
  onClose,
  handleVote,
  loadingVote,
}): JSX.Element => {
  const { title, id } = post;
  const { data, loading, error } = useFetchPostQuery({
    variables: { input: { id: id?.toString()! } },
  });

  return (
    <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={'inside'} size='4xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize='md'>
          <PostedBy post={post} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            <Vote handleVote={handleVote} loadingVote={loadingVote} post={post} />
            <Box ml='15px'>
              <Heading size='lg'>{title}</Heading>
              {!loading && !error ? (
                <Text my='2'>{data?.fetchPost?.body}</Text>
              ) : (
                <Spinner />
              )}
              <Box mt={4}>
                <MediaCarrousel post={post} />
              </Box>
              <Social />
              <CommentForm />
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
