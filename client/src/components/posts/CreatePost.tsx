import { Avatar, Box, Input } from '@chakra-ui/react';
import React from 'react';
import { MdPermMedia } from 'react-icons/md';
import { BiLink } from 'react-icons/bi';
import { VscAccount } from 'react-icons/vsc';
import { useRouter } from 'next/dist/client/router';

interface CreatePostProps {}

export const CreatePost: React.FC<CreatePostProps> = ({}): JSX.Element => {
  const router = useRouter();
  return (
    //margin='0 auto'
    <Box p={4} width='100%' bg='gray.900' display='flex'>
      <Avatar size={'sm'} src={(<VscAccount />) as any} m='auto' />
      <Input
        ml={3}
        mr={3}
        placeholder='Crear post'
        focusBorderColor='white'
        variant='filled'
        onClick={() => router.push('/post/create')}
      />
      <MdPermMedia size='2.4em' />
      <BiLink size='2.4em' style={{ marginLeft: '5px' }} />
    </Box>
  );
};
