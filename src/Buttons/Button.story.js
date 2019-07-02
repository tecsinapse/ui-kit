import React from 'react';
import { storiesOf } from '@storybook/react';

import Icon from '@mdi/react';

import { action } from '@storybook/addon-actions';
import FileCopyRounded from '@material-ui/icons/FileCopyRounded';

import DeleteIcon from '@material-ui/icons/Delete';
import { mdiFolderPlus } from '@mdi/js';
import { Button } from './Button';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { IconButton } from './IconButton';
import { FloatingButton } from './FloatingButton';
import { DivButton } from './DivButton';

storiesOf(`${GROUPS.COMPONENTS}|Button`, module)
  .add('button', () => (
    <Button onClick={action('onClick')}>Smart Button</Button>
  ))
  .add('success button', () => (
    <Button variant="success" onClick={action('onClick')}>
      Smart Button
    </Button>
  ))
  .add('warning button', () => (
    <Button variant="warning" onClick={action('onClick')}>
      Smart Button
    </Button>
  ))
  .add('error button', () => (
    <Button variant="error" onClick={action('onClick')}>
      Smart Button
    </Button>
  ))
  .add('primary button', () => (
    <Button variant="primary" onClick={action('onClick')}>
      Smart Button
    </Button>
  ))
  .add('primary button', () => (
    <Button variant="primary">
      <Icon path={mdiFolderPlus} size={1} color="white" />
      Nova Pasta
    </Button>
  ))
  .add('secondary button', () => (
    <Button variant="secondary" onClick={action('onClick')}>
      Smart Button
    </Button>
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
  ))
  .add('div button', () => (
    <div
      style={{
        width: '100vw',
        height: '160px',
        backgroundColor: '#e0e0e0',
      }}
    >
      <DivButton
        onClick={action('onClick')}
        infoText="COMUNICADOS"
        notifyNumber={0}
      >
        <FileCopyRounded fontSize="large" />
      </DivButton>
    </div>
  ));
