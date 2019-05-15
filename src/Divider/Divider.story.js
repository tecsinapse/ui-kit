import React from 'react';
import { storiesOf } from '@storybook/react';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { Divider } from './Divider';

storiesOf(`${GROUPS.LAYOUT}|Divider`, module).add('divider', () => (
  <Divider variant="error" />
));
