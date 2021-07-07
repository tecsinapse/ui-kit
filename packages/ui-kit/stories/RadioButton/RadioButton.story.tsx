import * as React from 'react';
import { RadioButton } from 'components/RadioButton';
import { DivFlex } from 'components/DivFlex';
import { GROUPS } from 'hierarchySeparators';
import { Description, Title, ArgsTable } from '@storybook/addon-docs/blocks';

export default {
  title: `${GROUPS.FORMS}/RadioButton`,
  component: RadioButton,
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
              `RadioButton` component can receive the following props:
            </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => <RadioButton {...args} />;

Base.args = {
  checked: true,
  label: 'Option 1',
  name: 'option1',
  value: 'option 1'
};
