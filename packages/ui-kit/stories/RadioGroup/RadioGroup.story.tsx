import React from 'react';
import { RadioGroup } from 'components/RadioGroup';
import { DivFlex } from 'components/DivFlex';
import { GROUPS } from 'hierarchySeparators';
import {
  ArgsTable,
  Description,
  Title } from '@storybook/addon-docs/blocks';
import { useState } from "react";

export default {
  title: `${GROUPS.FORMS}/RadioGroup`,
  component: RadioGroup,
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
              `RadioGroup` component can receive the following props:
            </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const [value, setValue] = useState('')

  return (
      <RadioGroup options={args.options} onChange={setValue} value={value}/>
  )
}

Base.args = {
  options: [
    {
      color: 'primary',
      label: 'Option 1',
      name: 'option1',
      value: 'option1'
    },
    {
      name: 'option2',
      value: 'option2'
    },
    {
      label: 'Option 3',
      name: 'option3',
      value: 'option 3',
      disabled: true,
      size: 'small'
    }
  ],
  required: false
};
