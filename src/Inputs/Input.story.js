import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { Input } from './Input';
import { GROUPS } from '../../.storybook/hierarchySeparators';

storiesOf(`${GROUPS.FORMS}|Input`, module).add('input', () => (
  <Input label="Placeholder" />
));
