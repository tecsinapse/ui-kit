import React from 'react'
import { ArgsTable, Title, Description } from '@storybook/addon-docs/blocks';
import { GROUPS } from 'hierarchySeparators';
import { Checkbox} from 'components/Checkbox'
import { DivFlex } from 'components/DivFlex'

export default {
  title: `${GROUPS.FORMS}/Checkbox`,
  component: Checkbox,
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
            <Description>The `Checkbox` component can receive the following props:</Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => <Checkbox {...args} />;

Base.args = {
  checked: true,
  label: 'option'
}
