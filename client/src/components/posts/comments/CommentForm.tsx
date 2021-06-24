import { Box, FormControl, Text, Textarea } from '@chakra-ui/react';
import React from 'react';
import { User } from 'src/generated/graphql';
import { getCurrentUser } from 'src/util/currentUser';
import NextLink from 'next/link';
import { Form, Formik, FormikProps } from 'formik';

interface CommentFormProps {}

export const CommentForm: React.FC<CommentFormProps> = ({}) => {
  const { data, loading } = getCurrentUser();
  const { username, id } = data?.me as User;

  const initialValues = {
    comment: '',
  };

  return (
    <Box my={3}>
      <Text fontSize='sm'>
        Comentar como{' '}
        <NextLink href={`/user/${id}`}>
          <a className='creator_link'>{username}</a>
        </NextLink>
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={(value, helpers) => {
          console.log(value);
        }}
      >
        {(props) => {
          return (
            <Form>
              <FormControl mt={2}>
                <Textarea
                  placeholder='Que piensas de esto?'
                  name='comment'
                  value={props.values.comment}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                />
              </FormControl>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
