// @flow
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { DivFlex } from '../withFlexCenter';

import { DateSlider } from './DateSlider';

const DateSliderStory = () => {
  const [dates, setDates] = useState([]);
  const dateRange = [
    new Date('2019-01-01'),
    new Date('2019-01-02'),
    new Date('2019-01-03'),
    new Date('2019-01-04'),
    new Date('2019-01-05'),
  ];

  return (
    <div style={{ width: '75%' }}>
      <DateSlider range={dateRange} values={dates} onChange={setDates} />
    </div>
  );
};

storiesOf(`${GROUPS.FORMS}|Date Slider`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('date slider input', () => <DateSliderStory />);
