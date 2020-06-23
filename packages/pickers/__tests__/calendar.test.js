/* eslint-disable no-console */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { DateTime } from 'luxon';
import { WeeklyCalendar } from '../src';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
  success: {
    main: 'pink',
  },
});

test.skip('Render Calendar', () => {
  const { container, getByText } = render(
    <MuiThemeProvider theme={theme}>
      <WeeklyCalendar
        onDayChange={day => {
          console.info('onDayChange: ', day && day.toISODate());
        }}
        onWeekChange={weekDays => {
          console.info('onWeekChange: ', weekDays);
        }}
        currentDate={DateTime.local(2014, 8, 18, 21, 11, 54, 0)}
      />
    </MuiThemeProvider>
  );

  expect(container).toContainElement(getByText('August, 2014'));
});
