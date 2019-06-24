import React, { useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { createMuiTheme } from '@material-ui/core/styles';
import { TesteUploader } from './TesteUploader';
import { Button } from '../Buttons/Button';

const SilentUploadExample = () => {
  const fancyRef = useRef();
  return (
    <div>
      <Button
        onClick={() => {
          fancyRef.current.open();
        }}
      >
        Upload
      </Button>
      <TesteUploader silent ref={fancyRef} />
    </div>
  );
};
storiesOf(`Uploader`, module)
  .addDecorator(muiTheme(createMuiTheme({ spacing: 12 })))
  .add('uploader drag', () => (
    <div style={{ width: '700px', height: '400px' }}>
      <TesteUploader />
    </div>
  ))
  .add('uploader form', () => (
    <div style={{ width: '800px', height: '500px' }}>
      <TesteUploader type="form" />
    </div>
  ))
  .add('uploader silent', () => <SilentUploadExample />);
