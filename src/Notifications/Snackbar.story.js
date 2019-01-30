import React from 'react';
import { storiesOf } from '@storybook/react';
import { Snackbar } from './Snackbar';
import { GROUPS } from '../../.storybook/hierarchySeparators';

storiesOf(`${GROUPS.NOTIFICATIONS}|Snackbar`, module)
  .add('notification error', () => <Snackbar show variant="error" />)
  .add('notification success', () => <Snackbar show variant="success" />)
  .add('notification warning', () => <Snackbar show variant="warning" />);
