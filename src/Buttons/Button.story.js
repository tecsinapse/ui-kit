import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { Button } from './Button';
import { GROUPS } from '../../.storybook/hierarchySeparators';

storiesOf(`${GROUPS.COMPONENTS}|Button`, module).add(
  'button',
  () => <Button onClick={action('onClick')}>Smart Button</Button>
);
