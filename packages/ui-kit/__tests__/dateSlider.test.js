import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { DateSlider } from 'components/Slider';

const dates = [];

const dateRange = [
  new Date('2019-01-01'),
  new Date('2019-01-02'),
  new Date('2019-01-03'),
  new Date('2019-01-04'),
  new Date('2019-01-05'),
];

test('Render Date Slider', () => {
  const { container, getByText } = render(
    <TestProvider>
      <DateSlider range={dateRange} values={dates} onChange={() => {}} />
    </TestProvider>
  );
  const element = getByText('Ter');

  expect(container).toContainElement(element);
});
