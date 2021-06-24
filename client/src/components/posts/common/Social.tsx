import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { BsArrow90DegRight, BsBookmark } from 'react-icons/bs';
import { VscComment } from 'react-icons/vsc';

interface SocialProps {
  onOpen?: () => void;
}

export const Social: React.FC<SocialProps> = ({ onOpen }): JSX.Element => {
  return (
    <Flex mt={4}>
      <Box display='flex' cursor='pointer' onClick={onOpen}>
        <VscComment fontSize='23px' />
        <Text ml='8px' mr='20px'>
          Comentarios
        </Text>
      </Box>

      <Box display='flex' cursor='pointer'>
        <BsArrow90DegRight fontSize='23px' />
        <Text ml='8px' mr='20px'>
          Compartir
        </Text>
      </Box>

      <Box display='flex' cursor='pointer'>
        <BsBookmark fontSize='23px' />
        <Text ml='8px' mr='20px'>
          Guardar
        </Text>
      </Box>
    </Flex>
  );
};
