import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DatePicker, PickersProvider } from '../src';
import { TestProvider } from '../../../utils/TestProvider';

test('Render Picker', () => {
  const selectedDate = new Date('2014-08-18T21:11:54');

  const { container } = render(
    <TestProvider>
      <PickersProvider>
        <DatePicker
          selectedDate={selectedDate}
          onChange={() => {}}
          format="dd/MM/yyyy"
          name="datepicker"
        />
      </PickersProvider>
    </TestProvider>
  );

  const input = container.querySelector('input');

  expect(input.value).toBe('18/08/2014');
});
