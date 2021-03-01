import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { DateTimePicker, PickersProvider } from '../src';

const datetime = new Date('2014-08-18T06:41:53');

test('Render Date Time Picker', () => {
  const { container } = render(
    <TestProvider>
      <PickersProvider>
        <DateTimePicker selectedDateTime={datetime} name="" />
      </PickersProvider>
    </TestProvider>
  );
  const input = container.querySelector('input');

  expect(input.value).toBe('18/08/2014 06:41');
});
