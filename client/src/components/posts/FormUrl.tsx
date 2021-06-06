import { FormControl, Textarea } from '@chakra-ui/react';
import { FormikProps } from 'formik';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { CreatePostInput } from 'src/generated/graphql';
import { ErrorMessageForm } from '../common/ErrorMessageForm';

interface FormUrlProps {
  props: FormikProps<CreatePostInput>;
  fileUrls: string[];
  setFilesUrls: (url: string[]) => void;
}

export const FormUrl: React.FC<FormUrlProps> = ({
  fileUrls,
  setFilesUrls,
}): JSX.Element => {
  const [url, setUrl] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUrl(e.target.value);
  };

  useEffect(() => {
    if (url?.split('')[0] === undefined) {
      setIsValid(true);
      return;
    }

    if (url !== null) {
      setFilesUrls(
        url.split(',').map((url) => {
          if (
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(
              url
            )
          ) {
            //retorna string sin espacios
            setIsValid(true);
            return url;
          }
          setIsValid(false);
        }) as any
      );
    }
  }, [url, isValid]);

  return (
    <FormControl mt={2}>
      <Textarea
        placeholder="Separar URL's con comas"
        name='files'
        value={url || ''}
        onChange={onChange}
      />
      {!isValid && <ErrorMessageForm>Formato incorrecto</ErrorMessageForm>}
      {fileUrls.length > 3 && (
        <ErrorMessageForm>No puede incluir mas de 3 URLS</ErrorMessageForm>
      )}
    </FormControl>
  );
};
