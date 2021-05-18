import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'util/apollo';

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo();

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
