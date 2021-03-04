import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { ValueSlider } from 'components/Slider';

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

test('Render Date Slider', () => {
  const { container, getByTestId } = render(
    <TestProvider>
      <ValueSlider marks={marks} />
    </TestProvider>
  );
  const element = getByTestId('render-value-slider');

  expect(container).toContainElement(element);
});
