// import { Meta, Story, ArgsTable as Props, Source } from '@storybook/addon-docs/blocks';
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
          <Subtitle />
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
    proceed={action('Confirm Action')}
    dismiss={action('Dismiss Action')}
    cancel={action('Cancel Action')}
  />
);

Dialog.args = {
  show: true,
};
