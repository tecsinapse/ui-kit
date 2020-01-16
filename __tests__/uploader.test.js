import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import { UploaderStory } from '../src/UploaderStory';

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

test('Render Uploader', () => {
  const { container, getByText } = render(
    <ThemeProvider variant="orange">
      <MuiThemeProvider theme={theme}>
        <UploaderStory />
      </MuiThemeProvider>
    </ThemeProvider>
  );
  expect(container).toContainElement(getByText('Drag and drop a file'));
});
