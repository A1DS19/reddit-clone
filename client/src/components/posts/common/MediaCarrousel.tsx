import React from 'react';
import { Image } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import { Post } from 'src/generated/graphql';

interface MediaCarrouselProps {
  post: Partial<Post>;
}

export const MediaCarrousel: React.FC<MediaCarrouselProps> = ({ post: { files } }) => {
  return (
    <React.Fragment>
      {files && files.length > 0 && (
        <Carousel autoPlay infiniteLoop interval={4000} showThumbs={false}>
          {files.map((img) => {
            return <Image key={img} maxW={477} maxH={512} src={img} alt='post image' />;
          })}
        </Carousel>
      )}
    </React.Fragment>
  );
};
