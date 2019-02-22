import React from 'react';
import { storiesOf } from '@storybook/react';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { GroupedInput } from './GroupedInput';

storiesOf(`${GROUPS.FORMS}|GroupedInput`, module).add('grouped input', () => (
  <GroupedInput />
));
