/* eslint-disable no-console */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DateTime } from 'luxon';
import { WeeklyCalendar } from '../src';
import { TestProvider } from '../../../utils/TestProvider';

test('Render Calendar', () => {
  const { container, getByTestId } = render(
    <TestProvider>
      <WeeklyCalendar
        onDayChange={day => {
          console.info('onDayChange: ', day && day.toISODate());
        }}
        onWeekChange={weekDays => {
          console.info('onWeekChange: ', weekDays.toLocaleString());
        }}
        currentDate={DateTime.local(2014, 8, 18, 21, 11, 54, 0)}
      />
    </TestProvider>
  );

  expect(container).toContainElement(getByTestId('week-header'));
});
