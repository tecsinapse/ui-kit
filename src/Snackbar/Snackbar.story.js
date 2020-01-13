import React from 'react';
import { storiesOf } from '@storybook/react';

import { Description, Props, Title } from '@storybook/addon-docs/dist/blocks';
import { Snackbar } from './Snackbar';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { DivFlex } from '../withFlexCenter';

storiesOf(`${GROUPS.NOTIFICATIONS}|Snackbar`, module)
  .addParameters({
    component: Snackbar,
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            The `Snackbar` component can receive the following props:
          </Description>
          <Props />
        </>
      ),
    },
  })
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('notification error', () => (
    <Snackbar show variant="error">
      Test Message
    </Snackbar>
  ))
  .add('notification success', () => (
    <Snackbar show variant="success">
      Test Message
    </Snackbar>
  ))
  .add('notification warning', () => (
    <Snackbar show variant="warning">
      Test Message
    </Snackbar>
  ));
