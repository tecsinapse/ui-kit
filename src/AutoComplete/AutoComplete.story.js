import React from 'react';
import { storiesOf } from '@storybook/react';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import AutoComplete from './AutoComplete';

storiesOf(`${GROUPS.FORMS}|Autocomplete`, module).add('Autocomplete', () => (
  <AutoComplete />
));
