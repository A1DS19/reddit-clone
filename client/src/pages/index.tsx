import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import { CreatePost } from 'src/components/posts/CreatePost';
import { PostList } from 'src/components/posts/PostList';
import { Layout } from '../components/layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Reddit</title>
        <meta name='description' content='Reddit clone ?!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <Container maxW='xl' centerContent>
          <CreatePost />
          <PostList />
        </Container>
      </Layout>
    </>
  );
}
