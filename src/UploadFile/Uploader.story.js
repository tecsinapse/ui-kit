import React from 'react';
import List from '@material-ui/core/List';
import { storiesOf } from '@storybook/react';
import { TesteUploader } from './TesteUploader';
import { UpFile } from './UpFile';

storiesOf(`Uploader`, module)
  .add('uploader simple', () => (
    <div style={{ width: '700px', height: '400px' }}>
      <TesteUploader />
    </div>
  ))
  .add('bla', () => (
    <div style={{ width: '400px', height: '300px' }}>
      <List>
        <UpFile
          filename="bla.png"
          completed={40}
          filesize="10MB"
          uprate="1Mb/s"
        />
      </List>
    </div>
  ));
