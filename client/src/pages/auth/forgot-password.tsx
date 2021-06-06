import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { ErrorMessage, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { Router, useRouter } from 'next/dist/client/router';
import React from 'react';
import { useState } from 'react';
import { requestPasswordReset } from '../../components/common/validationSchemas/validationSchema';
import { ErrorMessageForm } from 'src/components/common/ErrorMessageForm';
import { Layout } from 'src/components/layout';
import { useRequestPasswordResetMutation } from 'src/generated/graphql';

interface ForgotPasswordProps {}

interface ForgotPassowordInput {
  email: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}): JSX.Element => {
  const initialValues: ForgotPassowordInput = {
    email: '',
  };
  const router = useRouter();
  const [requestReset, { data, error, loading }] = useRequestPasswordResetMutation();
  const toast = useToast();

  return (
    <Layout>
      <Container maxW='container.sm'>
        <Heading mb={3} size='lg'>
          Olvide mi constraseña
        </Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={requestPasswordReset}
          onSubmit={async (
            values: ForgotPassowordInput,
            helpers: FormikHelpers<ForgotPassowordInput>
          ) => {
            try {
              await requestReset({
                variables: {
                  email: values.email,
                },
              });

              toast({
                title: 'Correo enviado!',
                description:
                  'Si el correo existe se ha enviado un correo para resetear la contraseña. En caso de no ver el email revisar bandeja de spam.',
                status: 'success',
                duration: 9000,
                isClosable: true,
              });

              helpers.resetForm();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {(props: FormikProps<ForgotPassowordInput>) => {
            return (
              <Form>
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
                  <Button
                    onClick={() => {
                      router.push('/');
                    }}
                  >
                    Cancelar
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Layout>
  );
};

export default ForgotPassword;
