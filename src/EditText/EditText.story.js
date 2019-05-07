import React from 'react';
import { storiesOf } from '@storybook/react';
import { EditText } from './EditText';

storiesOf(`EditText`, module).add('EditText', () => (
  <div style={{ width: '700px', height: '500px' }}>
    <EditText onChange={e => e /* console.log(e) */} error="Error" />
  </div>
));
