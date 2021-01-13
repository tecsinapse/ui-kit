import * as React from 'react';
import { ConfirmationAlert } from 'components/Alerts';
import { GROUPS } from 'hierarchySeparators';
import {
  ArgsTable,
  Title,
  Subtitle,
  Description,
} from '@storybook/addon-docs/blocks';
import { action } from '@storybook/addon-actions';

export default {
  title: `${GROUPS.ALERTS}/Confirmation Alert`,
  component: ConfirmationAlert,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            The `ConfirmationAlert` component can receive the following props.
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Dialog = args => (
  <ConfirmationAlert
    {...args}
    proceed={action('proceed')}
    dismiss={action('dismiss')}
    cancel={action('cancel')}
  />
);

Dialog.args = {
  show: true,
};
