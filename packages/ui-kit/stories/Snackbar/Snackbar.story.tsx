import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { Snackbar } from 'components/Snackbar';
import { GROUPS } from 'hierarchySeparators';
import { DivFlex } from 'components/DivFlex';

export default {
  title: `${GROUPS.NOTIFICATIONS}/Snackbar`,
  component: Snackbar,
  decorators: [
    Story => (
      <DivFlex>
        <Story />
      </DivFlex>
    ),
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            The `Snackbar` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => <Snackbar {...args}>Test Message</Snackbar>;

Base.args = {
  show: true,
  variant: 'error',
};
