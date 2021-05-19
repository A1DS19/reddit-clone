import Head from 'next/head';
import Image from 'next/image';
import { useQuery, gql } from '@apollo/client';

export default function Home() {
  return (
    <>
      <Head>
        <title>Reddit</title>
        <meta name='description' content='Reddit clone ?!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Hola</h1>
    </>
  );
}
