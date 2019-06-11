import React from 'react';
import { storiesOf } from '@storybook/react';
import {muiTheme} from 'storybook-addon-material-ui';
import { createMuiTheme } from '@material-ui/core/styles';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { Divider } from './Divider';

storiesOf(`${GROUPS.LAYOUT}|Divider`, module)
.addDecorator(muiTheme(createMuiTheme({spacing: 1})))
.add('divider', () => (
  <Divider variant="error" />
));
