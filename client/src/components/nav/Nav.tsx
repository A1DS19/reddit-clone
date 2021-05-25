import React, { FunctionComponent, ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Image,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { AuthMenu } from './AuthMenu';
import { NoAuth } from './NoAuth';
import { MeDocument, MeQuery, useLogoutMutation } from 'src/generated/graphql';
import { useRouter } from 'next/dist/client/router';

interface NavProps {
  user: MeQuery | undefined;
}

export const Navbar: FunctionComponent<NavProps> = ({ user }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Links: string[] = [];
  const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}
    >
      {children}
    </Link>
  );
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout({
        update(cache, { data }) {
          const res = data?.logout;

          if (res) {
            cache.writeQuery({
              query: MeDocument,
              data: {
                me: null,
              },
            });

            router.push('/');
          }
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Box bg='gray.900' px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Image
              borderRadius='full'
              boxSize='40px'
              src='/reddit.png'
              alt='logo'
              onClick={() => router.push('/')}
              style={{ cursor: 'pointer' }}
            />
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          {user?.me ? <AuthMenu handleLogout={handleLogout} /> : <NoAuth />}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
