import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { DivFlex } from '@tecsinapse/ui-kit';
import { Uploader, PreviewList } from 'Uploader';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { Button } from '@tecsinapse/ui-kit';
import { onAccept, onReject, onDeleteFiles } from './helpers';

export default {
  title: `Packages @tecsinapse/uploader/Drag`,
  component: Uploader,
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
            The `Uploader` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const ref = React.useRef();
  const [files, setFiles] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const style = { width: '700px', height: '400px' };

  return (
    <div style={style}>
      {args.silent && (
        <Button
          onClick={() => {
            ref.current.open();
          }}
          customVariant="success"
          variant="contained"
        >
          Upload
        </Button>
      )}
      <Uploader
        {...args}
        value={files}
        onAccept={onAccept(files, setFiles, setOpen)}
        onReject={onReject(files, setFiles, setOpen)}
        ref={ref}
      />
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        aria-labelledby="simple-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Uploading Files</DialogTitle>
        <DialogContent>
          <PreviewList
            value={files}
            onDelete={onDeleteFiles(files, setFiles)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

Base.args = {
  silent: false,
  filesLimit: 3,
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
  },
};
