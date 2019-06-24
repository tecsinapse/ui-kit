import React from 'react';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { createMuiTheme } from '@material-ui/core/styles';
import { EditText } from './EditText';

storiesOf(`EditText`, module)
  .addDecorator(muiTheme(createMuiTheme({ spacing: 12 })))
  .add('EditText', () => (
    <div style={{ width: '700px', height: '500px' }}>
      <EditText onChange={e => e /* console.log(e) */} error="" />
    </div>
  ));
