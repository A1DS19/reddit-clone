import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
} from '@chakra-ui/react';
import { VscAccount } from 'react-icons/vsc';
import { BiLogOutCircle } from 'react-icons/bi';
import { FunctionComponent } from 'react';

interface AuthMenuProps {
  handleLogout: () => Promise<void>;
}

export const AuthMenu: FunctionComponent<AuthMenuProps> = ({
  handleLogout,
}): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex alignItems={'center'}>
      <Menu closeOnBlur={true}>
        <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'}>
          <Avatar size={'sm'} src={(<VscAccount />) as any} />
        </MenuButton>
        <MenuList>
          <MenuItem>Link 1</MenuItem>
          <MenuItem>Link 2</MenuItem>
          {/* <MenuItem onClick={toggleColorMode}>
            {colorMode === 'dark' ? 'MODO CLARO' : 'MODO OSCURO'}
          </MenuItem> */}
          <MenuDivider />
          <MenuItem fontSize='md' p={2} onClick={async () => await handleLogout()}>
            <BiLogOutCircle style={{ marginRight: '5px' }} /> SALIR
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
