import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  Textarea,
} from '@chakra-ui/react';
import { ErrorMessage, FormikProps } from 'formik';
import React from 'react';
import { IMeta } from 'react-dropzone-uploader';
import { CreatePostInput } from 'src/generated/graphql';
import { ErrorMessageForm } from '../common/ErrorMessageForm';
import { FileUpload } from '../common/FileUpload';
import { FormUrl } from './FormUrl';

interface FormTabsProps {
  props: FormikProps<CreatePostInput>;
  files: File[] | string[];
  fileUrls: string[];
  setFilesUrls: (url: string[]) => void;
  setFiles: (data: File[] | string[]) => void;
}

export const FormTabs: React.FC<FormTabsProps> = ({
  props,
  files,
  setFiles,
  fileUrls,
  setFilesUrls,
}) => {
  return (
    <Tabs mt={3}>
      <TabList>
        <Tab>Contenido</Tab>
        <Tab>Imagenes/Videos</Tab>
        <Tab>Url</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <FormControl mt={2}>
            <Textarea
              placeholder='Contenido'
              name='body'
              value={props.values.body}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            <ErrorMessage name='body' component={ErrorMessageForm} />
          </FormControl>
        </TabPanel>
        <TabPanel>
          <FileUpload files={files} setFiles={setFiles} />
        </TabPanel>
        <TabPanel>
          <FormUrl props={props} fileUrls={fileUrls} setFilesUrls={setFilesUrls} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
