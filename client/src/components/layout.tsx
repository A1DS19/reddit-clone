import { Box } from '@chakra-ui/react';
import React, { FunctionComponent, ReactNode } from 'react';
import { useMeQuery } from 'src/generated/graphql';
import { Navbar } from './nav/Nav';

interface navbarProps {}

export const Layout: FunctionComponent<navbarProps> = ({
  children,
}): JSX.Element | null => {
  const { data, loading } = useMeQuery();

  if (loading) return null;

  return (
    <React.Fragment>
      <Navbar user={data} />
      <Box p={5}>
        <main>{children}</main>
      </Box>
    </React.Fragment>
  );
};

/*
const { colorMode, toggleColorMode } = useColorMode();
<Button color='gray.400' variant='outline' onClick={toggleColorMode}>
            {colorMode === 'dark' ? 'MODO CLARO' : 'MODO OSCURO'}
          </Button> */
