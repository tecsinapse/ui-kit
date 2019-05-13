import React from 'react';
import { storiesOf } from '@storybook/react';
import { Snackbar } from './Snackbar';
import { GROUPS } from '../../.storybook/hierarchySeparators';

storiesOf(`${GROUPS.NOTIFICATIONS}|Snackbar`, module)
  .add('notification error', () => (
    <Snackbar show variant="error">
      Test Message
    </Snackbar>
  ))
  .add('notification success', () => (
    <Snackbar show variant="success">
      Test Message
    </Snackbar>
  ))
  .add('notification warning', () => (
    <Snackbar show variant="warning">
      Test Message
    </Snackbar>
  ));
