import Head from 'next/head';
import Image from 'next/image';
import { useQuery, gql } from '@apollo/client';

const test = gql`
  query TEST {
    test
  }
`;

export default function Home() {
  const { data, error, loading } = useQuery(test);

  if (loading) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Reddit</title>
        <meta name='description' content='Reddit clone ?!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>{JSON.stringify(data)}</h1>
    </>
  );
}
