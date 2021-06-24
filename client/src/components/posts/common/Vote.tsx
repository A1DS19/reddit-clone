import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { Post } from 'src/generated/graphql';

interface VoteProps {
  post: Partial<Post>;
  handleVote: (type: 'upvote' | 'downvote') => void;
  loadingVote: boolean;
}

export const Vote: React.FC<VoteProps> = ({
  post: { voteStatus, votes },
  loadingVote,
  handleVote,
}) => {
  return (
    <Box fontSize='20px'>
      <Box>
        <AiOutlineArrowUp
          color={voteStatus === 1 ? 'green' : 'white'}
          cursor='pointer'
          onClick={() => handleVote('upvote')}
        />
      </Box>
      <Box ml='4px'>{!loadingVote ? votes : <Spinner />}</Box>
      <Box>
        <AiOutlineArrowDown
          color={voteStatus === -1 ? 'red' : 'white'}
          cursor='pointer'
          onClick={() => handleVote('downvote')}
        />
      </Box>
    </Box>
  );
};
