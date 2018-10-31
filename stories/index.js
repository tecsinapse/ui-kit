import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import React from 'react';
import { NewNewComponent } from '../src/NewNewComponent/NewNewComponent';

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <NewNewComponent onClick={action('clicked')}><span role="img" aria-label="so cool">😀 😎 👍 💯</span></NewNewComponent>
  ));   
