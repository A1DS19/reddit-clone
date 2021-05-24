import Head from 'next/head';
import React from 'react';
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
        <h1>TEST</h1>
      </Layout>
    </>
  );
}
