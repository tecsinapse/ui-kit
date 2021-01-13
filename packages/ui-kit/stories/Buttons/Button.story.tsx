import * as React from 'react';
import { ArgsTable, Description, Title } from '@storybook/addon-docs/blocks';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  IconButton,
  FloatingButton,
  DivButton,
  Button,
} from 'components/Buttons';
import { DivFlex } from 'components/DivFlex';
import { GROUPS } from 'hierarchySeparators';
import { action } from '@storybook/addon-actions';

export default {
  title: `${GROUPS.COMPONENTS}/Button`,
  component: Button,
  subcomponents: { IconButton, FloatingButton, DivButton },
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
            Each Button component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['default', 'inherit', 'primary', 'secondary'],
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ['contained', 'outlined', 'text'],
      },
    },
  },
};

export const Base = args => <Button {...args}>Base Button</Button>;

Base.args = {
  onClick: action('onClick'),
  customVariant: 'default',
};

export const Material = args => <Button {...args}>Material Button</Button>;

Material.args = {
  onClick: action('onClick'),
  color: 'primary',
  variant: 'outlined',
};

export const Icon = args => (
  <IconButton {...args}>
    <DeleteIcon />
  </IconButton>
);

Icon.args = {
  onClick: action('onClick'),
};
