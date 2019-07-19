import React from 'react';
import { storiesOf } from '@storybook/react';

import { GROUPS } from '../../.storybook/hierarchySeparators';
import { ConfirmationAlert } from './ConfirmationAlert';

storiesOf(`${GROUPS.ALERTS}|ConfirmationAlert`, module).add(
  'ConfirmationAlert',
  () => <ConfirmationAlert show />
);
