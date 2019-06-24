import React from 'react';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { createMuiTheme } from '@material-ui/core/styles';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import Password from './Password';

storiesOf(`${GROUPS.FORMS}|Input`, module)
  .addDecorator(muiTheme(createMuiTheme({ spacing: 12 })))
  .add('input password', () => <Password name="password" label="Password" />);
