import { ArgsTable, Title, Description } from '@storybook/addon-docs/blocks';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { GROUPS } from 'hierarchySeparators';
import { Input } from 'components/Inputs';
import { DivFlex } from 'components/DivFlex';
import { Password } from 'components/Password';
import * as React from 'react';
import { action } from '@storybook/addon-actions';

export default {
  title: `${GROUPS.FORMS}/Input`,
  component: Input,
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
            The `Input` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => <Input {...args} />;

Base.args = {
  name: 'input',
  label: 'Placeholder',
  onChange: action('onChange'),
};

export const Adornment = args => (
  <Input {...args} endAdornment={<AccountCircle />} />
);

Adornment.args = {
  name: 'input',
  label: 'Placeholder',
  onChange: action('onChange'),
};

export const CellphoneMask = args => {
  return <Input {...args} />;
};

CellphoneMask.args = {
  name: 'input',
  label: 'Placeholder',
  mask: 'cellphone',
  onChange: action('onChange'),
};

export const CustomMask = args => {
  const DATE_MASK = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  return <Input {...args} mask={DATE_MASK} />;
};

CustomMask.args = {
  name: 'input',
  label: 'Placeholder',
  onChange: action('onChange'),
};

export const PasswordVariant = args => <Password {...args} />;

PasswordVariant.args = {
  name: 'password',
  label: 'Password',
  onChange: action('onChange'),
};
