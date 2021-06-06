import React from 'react';
import Dropzone, { IFileWithMeta, StatusValue, IMeta } from 'react-dropzone-uploader';

interface FileUploadProps {
  files: File[] | string[];
  setFiles: (data: any) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  files,
  setFiles,
}): JSX.Element => {
  const handleChangeStatus = ({ file }: IFileWithMeta, status: StatusValue): void => {
    if (status === 'removed') {
      setFiles((oldState: File[]) =>
        oldState.filter(({ lastModified }) => lastModified !== file.lastModified)
      );
    }

    if (status === 'done') {
      setFiles((oldState: File[]) => [...oldState, file]);
    }
  };

  // useEffect(() => {
  //   props.values.files = files;
  // }, [files]);

  // const handleSubmit = (files: IFileWithMeta[], allFiles: IFileWithMeta[]) => {
  //   props.values.files = files.map((f: IFileWithMeta) => f.meta);
  //   //quita archivos al submit
  //   allFiles.forEach((f: IFileWithMeta) => f.remove());
  // };

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      //onSubmit={handleSubmit}
      maxFiles={1}
      multiple={false}
      submitButtonContent='Agregar'
      accept='image/*, video/*'
      inputContent='Agregue un archivo(imagen/video)'
    />
  );
};
