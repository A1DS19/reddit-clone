import { Box } from '@chakra-ui/react';
import React, { FunctionComponent, ReactNode } from 'react';
import { getCurrentUser } from '../util/currentUser';
import { Navbar } from './nav/Nav';

interface navbarProps {}

export const Layout: FunctionComponent<navbarProps> = ({
  children,
}): JSX.Element | null => {
  const { data, loading } = getCurrentUser();

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
