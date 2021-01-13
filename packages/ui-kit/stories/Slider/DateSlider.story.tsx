import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { DateSlider } from 'components/Slider';
import { GROUPS } from 'hierarchySeparators';
import { DivFlex } from 'components/DivFlex';
import { action } from '@storybook/addon-actions';

export default {
  title: `${GROUPS.COMPONENTS}/Date Slider`,
  component: DateSlider,
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
            The `DateSlider` component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const [dates, setDates] = React.useState([]);

  const handleChange = array => {
    action('onChange')(array);
    setDates(array);
  };

  const dateRange = [
    new Date('2019-01-01'),
    new Date('2019-01-02'),
    new Date('2019-01-03'),
    new Date('2019-01-04'),
    new Date('2019-01-05'),
  ];

  const style = { width: '75%', marginTop: '5vh' };

  return (
    <div style={style}>
      <DateSlider
        {...args}
        range={dateRange}
        values={dates}
        onChange={handleChange}
      />
    </div>
  );
};

Base.args = {
  simple: false,
};
