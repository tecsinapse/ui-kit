import React from 'react';
import { storiesOf } from '@storybook/react';
import { TesteUploader } from './TesteUploader';

storiesOf(`Uploader`, module)
  .add('uploader drag', () => (
    <div style={{ width: '700px', height: '400px' }}>
      <TesteUploader />
    </div>
  ))
  .add('uploader form', () => (
    <div style={{ width: '800px', height: '500px' }}>
      <TesteUploader type="form" />
    </div>
  ));
