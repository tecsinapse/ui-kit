import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { ValueSlider } from 'components/Slider';
import { GROUPS } from 'hierarchySeparators';
import { DivFlex } from 'components/DivFlex';
import { defaultOrange } from 'utils/colors';

export default {
  title: `${GROUPS.COMPONENTS}/Value Slider`,
  component: ValueSlider,
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
            The `ValueSlider` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 5,
      label: '5',
    },
  ];

  const stylesValue = { width: '75%', marginTop: '5vh' };

  return (
    <div style={stylesValue}>
      <ValueSlider {...args} colorSlider={defaultOrange} marks={marks} />
    </div>
  );
};

Base.args = {
  min: 0,
  max: 5,
  value: 3,
  defaultValue: 10,
  step: 2,
};
