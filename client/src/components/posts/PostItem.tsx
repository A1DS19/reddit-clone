import { Box, Flex, Text, Image } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { VscComment } from 'react-icons/vsc';
import { BsArrow90DegRight, BsBookmark } from 'react-icons/bs';
import { Post } from 'src/generated/graphql';
import { Carousel } from 'react-responsive-carousel';
import formatDistance from 'date-fns/formatDistance';
import esLocale from 'date-fns/locale/es';

interface PostItemProps {
  post: Partial<Post>;
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { id, files, createdAt, title, body, votes } = post;
  return (
    <Box p={4} width='100%' m='10px 0' bg='gray.900'>
      <Flex>
        <Box fontSize='20px'>
          <Box>
            <AiOutlineArrowUp cursor='pointer' />
          </Box>
          <Box ml='4px'>{votes}</Box>
          <Box>
            <AiOutlineArrowDown cursor='pointer' />
          </Box>
        </Box>
        <Box ml='15px'>
          <Text color='gray.400'>
            Posteado por (usuario) hace{' '}
            {formatDistance(new Date(), new Date(createdAt), { locale: esLocale })}
          </Text>
          <Text>{title}</Text>
          <Text>{body}</Text>
          <Box mt={4}>
            {files && files.length > 0 && (
              <Carousel autoPlay infiniteLoop interval={4000} showThumbs={false}>
                {files.map((img) => {
                  //console.log(img);

                  return (
                    <Image
                      key={img}
                      width={477}
                      height={288}
                      src={img}
                      alt='post image'
                    />
                  );
                })}
              </Carousel>
            )}
          </Box>
          <Flex mt={4}>
            <VscComment fontSize='23px' cursor='pointer' />
            <Text ml='8px' mr='20px'>
              Comentarios
            </Text>
            <BsArrow90DegRight fontSize='23px' cursor='pointer' />
            <Text ml='8px' mr='20px'>
              Compartir
            </Text>
            <BsBookmark fontSize='23px' cursor='pointer' />
            <Text ml='8px' mr='20px'>
              Guardar
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
