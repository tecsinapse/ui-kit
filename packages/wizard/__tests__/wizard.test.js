import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { Step } from '@material-ui/core';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import { Wizard } from '../src';

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

test('Render Wizard', () => {
  let activeStep = 0;

  const { container, getByText } = render(
    <ThemeProvider variant="orange">
      <MuiThemeProvider theme={theme}>
        <Wizard
          activeStep={activeStep}
          onChange={() => {
            if (activeStep === 3) {
              return null;
            }
            activeStep += 1;
            return null;
          }}
          hideBottomStepLabel
        >
          <Step title="Step 1">Passo 1</Step>
          <Step title="Step 2">
            <div>2</div>
          </Step>
          <Step
            title="Step 3"
            warningText="Preencheu todos os dados do usuário?"
          >
            <div>3</div>
          </Step>
          <Step title="Step 4">4</Step>
        </Wizard>
      </MuiThemeProvider>
    </ThemeProvider>
  );
  expect(container).toContainElement(getByText('Passo 1'));
});
