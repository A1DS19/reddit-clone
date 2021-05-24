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
  Box,
} from '@chakra-ui/react';
import { ErrorMessageForm } from '../../components/common/ErrorMessageForm';
import { Formik, Form, FormikProps, FormikHelpers, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import { FunctionComponent } from 'react';
import { registerValidationSchema } from './validationSchema';
import { MeDocument, useMeQuery, useRegisterMutation } from 'src/generated/graphql';
import { useRouter } from 'next/dist/client/router';

interface registerProps {
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export interface RegisterInput {
  email: string;
  username: string;
  password: string;
  confirmPassword?: string;
}

export const Register: FunctionComponent<registerProps> = ({
  isOpen,
  onClose,
}): JSX.Element => {
  const initialValues: RegisterInput = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };
  const [register, { data, loading, error: registerError }] = useRegisterMutation();
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
          <ModalHeader>Crear Cuenta</ModalHeader>
          <ModalCloseButton />

          <Formik
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            onSubmit={async (
              values: RegisterInput,
              helpers: FormikHelpers<RegisterInput>
            ) => {
              delete values.confirmPassword;
              try {
                await register({
                  variables: {
                    input: values,
                  },
                  refetchQueries: [{ query: MeDocument }],
                });

                if (data?.register && !registerError) {
                  onClose();
                }
              } catch (error) {
                setError(error.message);
              }
            }}
          >
            {(props: FormikProps<RegisterInput>) => {
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
                      <FormLabel>Nombre de usuario</FormLabel>
                      <Input
                        placeholder='Usuario'
                        name='username'
                        value={props.values.username}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <ErrorMessage name='username' component={ErrorMessageForm} />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Contraseña</FormLabel>
                      <Input
                        placeholder='Contraseña'
                        type='password'
                        name='password'
                        value={props.values.password}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <ErrorMessage name='password' component={ErrorMessageForm} />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Repetir Contraseña</FormLabel>
                      <Input
                        placeholder='Repetir Contraseña'
                        type='password'
                        name='confirmPassword'
                        value={props.values.confirmPassword}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <ErrorMessage name='confirmPassword' component={ErrorMessageForm} />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      disabled={!props.isValid || !props.dirty}
                      isLoading={loading}
                      type='submit'
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
