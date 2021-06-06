import Head from 'next/head';
import React from 'react';
import { CreatePost } from 'src/components/posts/CreatePost';
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
        <CreatePost />
      </Layout>
    </>
  );
}
