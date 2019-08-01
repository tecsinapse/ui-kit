import React from 'react';
import { storiesOf } from '@storybook/react';

import { GROUPS } from '../../.storybook/hierarchySeparators';
import { ConfirmationAlert } from './ConfirmationAlert';

storiesOf(`${GROUPS.ALERTS}|ConfirmationAlert`, module).add(
  'ConfirmationAlert',
  () => (
    <ConfirmationAlert
      show
      // eslint-disable-next-line
      cancel={() => console.log('cancel')}
      // eslint-disable-next-line
      dismiss={() => console.log('close')}
      // eslint-disable-next-line
      proceed={() => console.log('proceed')}
    />
  )
);
