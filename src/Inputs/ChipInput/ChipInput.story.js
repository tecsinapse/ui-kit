import React from 'react';
import { storiesOf } from '@storybook/react';
import { GROUPS } from '../../../.storybook/hierarchySeparators';
import ChipInput from './ChipInput';

storiesOf(`${GROUPS.FORMS}|Input`, module).add('chip input', () => (
  <ChipInput
    defaultValue={['clown fish', 'whale', 'shark']}
    fullWidth
    label="Fish and chips"
    placeholder="Pressione enter para adicionar"
  />
));
