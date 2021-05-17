import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Reddit Home</title>
        <meta name='description' content='Reddit clone?' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>REDDIT</h1>
    </>
  );
}
