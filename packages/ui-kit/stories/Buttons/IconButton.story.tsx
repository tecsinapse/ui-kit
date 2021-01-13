import * as React from 'react';
import { ArgsTable, Description, Title } from '@storybook/addon-docs/blocks';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from 'components/Buttons';
import { DivFlex } from 'components/DivFlex';
import { GROUPS } from 'hierarchySeparators';
import { action } from '@storybook/addon-actions';

export default {
  title: `${GROUPS.COMPONENTS}/Button/Icon`,
  component: IconButton,
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
            The `IconButton` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => (
  <IconButton {...args}>
    <DeleteIcon />
  </IconButton>
);

Base.args = {
  onClick: action('onClick'),
};
