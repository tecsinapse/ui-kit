import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button } from '../src/Buttons/Button';

storiesOf('Buttons', module)
  .add('success button', () => (
    <Button variant="success" onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
  .add('submiting button', () => (
    <Button variant="success" submitting onClick={action('clicked')}>
      Hello Button
    </Button>
  ))

  .add('secondary button', () => (
    <Button variant="secondary" onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))
  .add('third button', () => (
    <Button variant="third" onClick={action('clicked')}>
      Error Button
    </Button>
  ))
  .add('margin success button', () => (
    <Button variant="success" margin onClick={action('clicked')}>
      Hello Button
    </Button>
  ));
