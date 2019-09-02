import React from 'react';
import { storiesOf } from '@storybook/react';

import { Snackbar } from './Snackbar';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { DivFlex } from '../withFlexCenter';

storiesOf(`${GROUPS.NOTIFICATIONS}|Snackbar`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
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
