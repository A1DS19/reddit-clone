import { Button, Container, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { ErrorMessage, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React, { useState } from 'react';
import { ErrorMessageForm } from 'src/components/common/ErrorMessageForm';
import { createPostValidationSchema } from 'src/components/common/validationSchemas/postValidationSchema';
import { Layout } from 'src/components/layout';
import { FormTabs } from 'src/components/posts/FormTabs';
import {
  CreatePostInput,
  useCreatePostMutation,
  useUploadFileMutation,
} from 'src/generated/graphql';
import Router from 'next/router';
import { IMeta } from 'react-dropzone-uploader';

interface createProps {}

const create: React.FC<createProps> = ({}): JSX.Element => {
  const [files, setFiles] = useState<File[] | string[]>([]);
  const [fileUrls, setFilesUrls] = useState<string[]>([]);
  const [createPost, { loading }] = useCreatePostMutation();
  const [uploadFile, { loading: uploadLoading }] = useUploadFileMutation();

  const [error, setError] = useState('');
  const initialValues: CreatePostInput = {
    title: '',
    body: '',
  };

  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        validationSchema={createPostValidationSchema}
        onSubmit={async (
          values: CreatePostInput,
          helpers: FormikHelpers<CreatePostInput>
        ) => {
          try {
            const { data, errors: createPostError } = await createPost({
              variables: {
                input: values,
              },
            });

            if (data && files.length === 0) {
              Router.push('/');
            }

            if (files.length > 0 || fileUrls.length > 0) {
              const { data: post_with_file_data, errors: uploadFileError } =
                await uploadFile({
                  variables: {
                    file: files[0] as File,
                    postId: data?.createPost.id as string,
                    fileUrls: {
                      files: fileUrls,
                    },
                  },
                });

              //si funciona el file upload redirect a home
              if (post_with_file_data && !uploadFileError) {
                Router.push('/');
              }
            }
          } catch (error) {
            setError(error.message);
          }
        }}
      >
        {(props: FormikProps<CreatePostInput>) => {
          return (
            <Container maxW='container.sm'>
              <Form>
                {error && <ErrorMessageForm>{error}</ErrorMessageForm>}
                <FormControl>
                  <FormLabel>Titulo</FormLabel>
                  <Input
                    placeholder='Titulo'
                    name='title'
                    value={props.values.title}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <ErrorMessage name='title' component={ErrorMessageForm} />
                </FormControl>

                <FormTabs
                  props={props}
                  files={files}
                  setFiles={setFiles}
                  fileUrls={fileUrls}
                  setFilesUrls={setFilesUrls}
                />
                <Button
                  type='submit'
                  disabled={!props.isValid || !props.dirty}
                  isLoading={loading || uploadLoading}
                  colorScheme='blue'
                >
                  Postear
                </Button>
              </Form>
            </Container>
          );
        }}
      </Formik>
    </Layout>
  );
};

export default create;
