import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { DivFlex } from '@tecsinapse/ui-kit';
import { FormUploader } from 'Uploader/FormUploader';
import { onAccept, onReject, onDeleteFiles } from './helpers';

export default {
  title: `Packages @tecsinapse/uploader/Form`,
  component: FormUploader,
  decorators: [
    Story => (
      <DivFlex>
        <Story />
      </DivFlex>
    ),
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            The `FormUploader` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const [files, setFiles] = React.useState({});
  const style = { width: '800px', height: '500px' };

  return (
    <div style={style}>
      <FormUploader
        {...args}
        value={files}
        onAccept={onAccept(files, setFiles, () => {})}
        onReject={onReject(files, setFiles, () => {})}
        onDelete={onDeleteFiles(files, setFiles)}
      />
    </div>
  );
};

Base.args = {
  messages: {
    maximumFileLimitMessage: limit =>
      `Maximum allowed number of files exceeded. Only ${limit} allowed`,
    maximumFileNumberMessage: 'Maximum allowed number of files',
    filenameFailedMessage: name => `${name} failed. `,
    filetypeNotSupportedMessage: 'File type not supported. ',
    sizeLimitErrorMessage: size => `Size limit ${size}.`,
    undefinedErrorMessage: 'Undefined error',
    title: 'Drag and drop a file',
    buttonLabel: 'Upload Files',
    subtitle: 'or click on the button',
    fileRemovedMessage: 'File removed from upload list',
    fileUploadedSucessfullyMessage: filename =>
      `${filename} uploaded successfully`,
    fileErroedMessage: (filename, error) => `${filename} error: ${error}`,
  },
};
