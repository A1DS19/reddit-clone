import { Box } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';

interface ErrorMessageFormProps {}

export const ErrorMessageForm: FunctionComponent<ErrorMessageFormProps> = ({
  children,
}): JSX.Element => {
  return (
    <Box color='red' p={2} mt={3} mb={2} bg='white' rounded='md'>
      {children}
    </Box>
  );
};
