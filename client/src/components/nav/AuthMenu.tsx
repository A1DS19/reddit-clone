import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
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
  return (
    <Flex alignItems={'center'}>
      <Menu>
        <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'}>
          <Avatar size={'sm'} src={(<VscAccount />) as any} />
        </MenuButton>
        <MenuList>
          <MenuItem>Link 1</MenuItem>
          <MenuItem>Link 2</MenuItem>
          <MenuDivider />
          <MenuItem fontSize='md' p={2} onClick={async () => await handleLogout()}>
            <BiLogOutCircle style={{ marginRight: '5px' }} /> SALIR
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
