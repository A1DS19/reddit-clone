import '../../styles/dropzoneComponent.css';
import '../../styles/globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../../styles/theme';
import { createApolloClient } from '../util/apollo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={createApolloClient()}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
