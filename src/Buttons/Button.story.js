import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from './Button';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { IconButton } from './IconButton';
import { FloatingButton } from './FloatingButton';

storiesOf(`${GROUPS.COMPONENTS}|Button`, module)
  .add('button', () => (
    <Button onClick={action('onClick')}>Smart Button</Button>
  ))
  .add('icon button', () => (
    <IconButton onClick={action('onClick')}>
      <DeleteIcon />
    </IconButton>
  ))
  .add('floating button', () => (
    <FloatingButton onClick={action('onClick')}>
      <DeleteIcon />
    </FloatingButton>
  ));
