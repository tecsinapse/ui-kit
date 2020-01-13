import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Icon from '@mdi/react';

import FileCopyRounded from '@material-ui/icons/FileCopyRounded';

import DeleteIcon from '@material-ui/icons/Delete';
import { mdiFolderPlus } from '@mdi/js';
import { Description, Props, Title } from '@storybook/addon-docs/dist/blocks';
import { Button } from './Button';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { IconButton } from './IconButton';
import { FloatingButton } from './FloatingButton';
import { DivButton } from './DivButton';
import { DivFlex } from '../withFlexCenter';

const handleClick = () => {
  // eslint-disable-next-line no-console
  console.log('Button clicked');
};

storiesOf(`${GROUPS.COMPONENTS}|Button`, module)
  .addParameters({
    subcomponents: {
      Button,
      FloatingButton,
      IconButton,
      DivButton,
    },
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            Each Button component can receive the following props:
          </Description>
          <Props />
        </>
      ),
    },
  })
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('button', () => <Button onClick={handleClick}>Smart Button</Button>)
  .add('default button', () => (
    <Button customVariant="default" onClick={handleClick}>
      Smart Button
    </Button>
  ))
  .add('success button submitting', () => {
    const [submitting, setSub] = useState(false);
    return (
      <Button
        customVariant="success"
        onClick={() => setSub(true)}
        submitting={submitting}
      >
        Smart Button
      </Button>
    );
  })
  .add('warning button', () => (
    <Button customVariant="warning" onClick={handleClick}>
      Smart Button
    </Button>
  ))
  .add('error button', () => (
    <Button customVariant="error" onClick={handleClick}>
      Smart Button
    </Button>
  ))
  .add('primary button', () => (
    <Button color="primary" onClick={handleClick}>
      Smart Button
    </Button>
  ))
  .add('primary button contained', () => (
    <Button color="primary" variant="contained">
      <Icon path={mdiFolderPlus} size={1} color="white" />
      Nova Pasta
    </Button>
  ))
  .add('secondary button', () => (
    <Button color="secondary" onClick={handleClick}>
      Smart Button
    </Button>
  ))
  .add('icon button', () => (
    <IconButton onClick={handleClick}>
      <DeleteIcon />
    </IconButton>
  ))
  .add('floating button', () => (
    <FloatingButton onClick={handleClick}>
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
      <DivButton onClick={handleClick} infoText="COMUNICADOS" notifyNumber={0}>
        <FileCopyRounded fontSize="large" />
      </DivButton>
    </div>
  ));
