import * as React from 'react';
import {
  ArgsTable,
  Description,
  Title,
} from '@storybook/addon-docs/blocks';
import DeleteIcon from '@material-ui/icons/Delete';
import { FloatingButton } from 'components/Buttons';
import { DivFlex } from 'components/DivFlex';
import { GROUPS } from 'hierarchySeparators';
import { action } from '@storybook/addon-actions';

export default {
  title: `${GROUPS.COMPONENTS}/Button/Floating`,
  component: FloatingButton,
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
            The `FloatingButton` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => (
  <FloatingButton {...args}>
    <DeleteIcon />
  </FloatingButton>
);

Base.args = {
  onClick: action('onClick'),
  variantFab: 'default',
};
