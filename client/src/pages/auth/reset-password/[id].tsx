import {
  Container,
  Heading,
  toast,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  useToast,
} from '@chakra-ui/react';
import { Formik, FormikHelpers, FormikProps, Form, ErrorMessage } from 'formik';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useState } from 'react';
import { resetPasswordSchema } from 'src/components/auth/validationSchema';
import { ErrorMessageForm } from 'src/components/common/ErrorMessageForm';
import { Layout } from 'src/components/layout';
import { useResetPasswordMutation } from 'src/generated/graphql';

interface ResetPasswordProps {}

interface ResetPasswordInput {
  password: string;
  confirmPassword?: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({}): JSX.Element | null => {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();
  const [resetPassword, { data, error, loading }] = useResetPasswordMutation();
  const [passChanged, setPassChanged] = useState(false);

  if (!id) return null;

  const initialValues: ResetPasswordInput = {
    password: '',
    confirmPassword: '',
  };

  return (
    <Layout>
      <Container maxW='container.sm'>
        <Heading mb={3} size='lg'>
          Contraseña nueva
        </Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordSchema}
          onSubmit={async (
            values: ResetPasswordInput,
            helpers: FormikHelpers<ResetPasswordInput>
          ) => {
            try {
              await resetPassword({
                variables: {
                  input: {
                    resetToken: id as string,
                    password: values.password,
                  },
                },
              });

              toast({
                title: 'Contraseña reseteada',
                description:
                  'La contraseña ha sido reseteada con exito, vuelva y iniciar sesion.',
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
              helpers.resetForm();
              setPassChanged(true);
            } catch (error) {
              toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
              });
              helpers.resetForm();
            }
          }}
        >
          {(props: FormikProps<ResetPasswordInput>) => {
            return (
              <Form>
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
                <Box mt={2}>
                  <Button
                    type='submit'
                    disabled={!props.isValid || !props.dirty}
                    isLoading={loading}
                    colorScheme='blue'
                    mr={3}
                  >
                    Submit
                  </Button>
                  {passChanged && (
                    <Button
                      onClick={() => {
                        router.push('/');
                      }}
                    >
                      Volver
                    </Button>
                  )}
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Layout>
  );
};

export default ResetPassword;
