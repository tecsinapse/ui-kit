import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import { DatePicker, PickersProvider } from '../src';

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

test('Render Picker', () => {
  const selectedDate = new Date('2014-08-18T21:11:54');

  const { container } = render(
    <ThemeProvider variant="orange">
      <MuiThemeProvider theme={theme}>
        <PickersProvider>
          <DatePicker
            selectedDate={selectedDate}
            onChange={() => {}}
            format="dd/MM/yyyy"
            name="datepicker"
          />
        </PickersProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  );

  const input = container.querySelector('input');
  expect(input.value).toBe('18/08/2014');
});
