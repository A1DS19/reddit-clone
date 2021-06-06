import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Box,
} from '@chakra-ui/react';
import { ErrorMessageForm } from '../../components/common/ErrorMessageForm';
import { Formik, FormikHelpers, Form, ErrorMessage, FormikProps } from 'formik';
import React from 'react';
import { FunctionComponent } from 'react';
import { loginValidationSchema } from '../common/validationSchemas/validationSchema';
import { MeDocument, useLoginMutation } from 'src/generated/graphql';
import { useState } from 'react';

interface loginProps {
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export interface LoginInput {
  email: string;
  password: string;
}

export const Login: FunctionComponent<loginProps> = ({
  isOpen,
  onClose,
}): JSX.Element => {
  const initialValues: LoginInput = {
    email: '',
    password: '',
  };
  const [login, { data, loading, error: loginError }] = useLoginMutation({
    onCompleted: () => onClose(),
  });
  const [error, setError] = useState('');

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setError('');
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Iniciar Sesion</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={async (values: LoginInput, helpers: FormikHelpers<LoginInput>) => {
              try {
                await login({
                  variables: {
                    input: values,
                  },
                  refetchQueries: [{ query: MeDocument }],
                });

                // if (data?.login && !loginError) {
                //   onClose();
                // }
              } catch (error) {
                setError(error.message);
              }
            }}
          >
            {(props: FormikProps<LoginInput>) => {
              return (
                <Form>
                  <ModalBody pb={6}>
                    {error && <ErrorMessageForm>{error}</ErrorMessageForm>}
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        placeholder='Email'
                        name='email'
                        value={props.values.email}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <ErrorMessage name='email' component={ErrorMessageForm} />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Contraseña</FormLabel>
                      <Input
                        type='password'
                        placeholder='Contraseña'
                        name='password'
                        value={props.values.password}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <ErrorMessage name='password' component={ErrorMessageForm} />
                    </FormControl>

                    <Box mt={1}>
                      <Link href='/auth/forgot-password' color='blue.400'>
                        Olvide mi contraseña
                      </Link>
                    </Box>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      type='submit'
                      disabled={!props.isValid || !props.dirty}
                      isLoading={loading}
                      colorScheme='blue'
                      mr={3}
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={() => {
                        onClose();
                        setError('');
                      }}
                    >
                      Cancelar
                    </Button>
                  </ModalFooter>
                </Form>
              );
            }}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};
