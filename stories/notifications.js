import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Snackbar } from '../src/Notifications/Snackbar';

storiesOf('Notifications', module)
  .add('success snack', () => (
    <Snackbar variant="success" show onClose={action('closed')} >
      Hello Button
    </Snackbar>
  ))
  .add('warning snack', () => (
    <Snackbar variant="warning" show onClose={action('closed')} >
      Hello Button
    </Snackbar>
  ))
  .add('error snack', () => (
    <Snackbar variant="error" show onClose={action('closed')} >
      Hello Button
    </Snackbar>
  ))



