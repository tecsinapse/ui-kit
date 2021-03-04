import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestProvider } from 'TestProvider';
import { TimePicker, PickersProvider } from '../src';

const time = new Date('2014-08-18T06:41:53');

test('Render Time Picker', () => {
  const { container } = render(
    <TestProvider>
      <PickersProvider>
        <TimePicker selectedTime={time} name="" />
      </PickersProvider>
    </TestProvider>
  );
  const input = container.querySelector('input');

  expect(input.value).toContain('6:41');
});
