import React from 'react';
import { storiesOf } from '@storybook/react';

import { Description, Props, Title } from '@storybook/addon-docs/dist/blocks';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { ConfirmationAlert } from './ConfirmationAlert';

storiesOf(`${GROUPS.ALERTS}|Confirmation Alert`, module)
  .addParameters({
    component: ConfirmationAlert,
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            The `ConfirmationAlert` component can receive the following props:
          </Description>
          <Props />
        </>
      ),
    },
  })
  .add('Confirmation alert dialog', () => (
    <ConfirmationAlert
      show
      // eslint-disable-next-line
      cancel={() => console.log('cancel')}
      // eslint-disable-next-line
      dismiss={() => console.log('close')}
      // eslint-disable-next-line
      proceed={() => console.log('proceed')}
    />
  ));
