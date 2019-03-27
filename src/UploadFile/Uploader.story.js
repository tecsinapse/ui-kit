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
    <div style={{ width: '450px', height: '300px' }}>
      <List>
        <UpFile
          filename="bla111111111111111111111111111111.png"
          completed={99}
          filesize="10MB"
          uprate="1Mb/s"
        />
        <UpFile
          filename="bla111111111111111111.png"
          completed={100}
          filesize="10MB"
          uprate="1Mb/s"
          data="https://weeblytutorials.com/wp-content/uploads/2017/04/Weebly-blogs-example.png"
        />
        <UpFile
          filename="bla2.png"
          completed={10}
          filesize="10MB"
          uprate="1Mb/s"
          error="File type not supported"
        />
      </List>
    </div>
  ));
