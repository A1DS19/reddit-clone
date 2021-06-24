import React from 'react';
import NextLink from 'next/link';
import { Post } from 'src/generated/graphql';
import { formatDistance } from 'date-fns';
import esLocale from 'date-fns/locale/es';

interface PostedByProps {
  post: Partial<Post>;
}

export const PostedBy: React.FC<PostedByProps> = ({ post: { creator, createdAt } }) => {
  return (
    <React.Fragment>
      Posteado por{' '}
      <NextLink as='a' href={`/user/${creator?.id}`}>
        <a className='creator_link'>{creator?.username}</a>
      </NextLink>{' '}
      hace {formatDistance(new Date(), new Date(createdAt), { locale: esLocale })}
    </React.Fragment>
  );
};
