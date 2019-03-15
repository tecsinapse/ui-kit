import React from 'react';
import { storiesOf } from '@storybook/react';
import TesteUploader from './TesteUploader';

storiesOf(`Uploader`, module).add('carousel single', () => (
  <div style={{ width: '700px', height: '400px' }}>
    <TesteUploader />
  </div>
));
