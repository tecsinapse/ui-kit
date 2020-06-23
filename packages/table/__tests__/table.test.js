import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import { Table } from '../src';
import { columnsSimple } from '../src/Table/utils/storyHelper';
import { cars } from '../src/Table/utils/exampleData';

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

test('Render Table', () => {
  const { container } = render(
    <ThemeProvider variant="orange">
      <MuiThemeProvider theme={theme}>
        <Table
          columns={columnsSimple}
          data={cars}
          rowId={row => row.id}
          onRowClick={rowData => {
            // eslint-disable-next-line no-alert
            alert(JSON.stringify(rowData));
          }}
        />
      </MuiThemeProvider>
    </ThemeProvider>
  );
  const title = container.querySelector('span');

  expect(title.firstChild.textContent).toContain('Total: ');
});
