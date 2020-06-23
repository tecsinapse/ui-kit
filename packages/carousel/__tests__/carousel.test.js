import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import { AutoRotatingCarousel, Slide } from '../src';

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

test('Render Carousel', () => {
  const { container, getByText } = render(
    <ThemeProvider variant="orange">
      <MuiThemeProvider theme={theme}>
        <AutoRotatingCarousel>
          <Slide
            title="Seja bem-vindo ao novo Portal"
            titleColor="#f69322"
            subtitle="Com novos recursos e design mais atrativo e fácil de usar. Aproveite as novidades!<br/>Dúvidas? Acesse a Central de Relacionamentos, HelpTec."
            backgroundImage="https://ak6.picdn.net/shutterstock/videos/21643606/thumb/1.jpg"
            buttonTitle="ACESSAR HELPTEC"
            link="https://www.tecsinapse.com.br/"
            linkTarget="_blank"
          />
        </AutoRotatingCarousel>
      </MuiThemeProvider>
    </ThemeProvider>
  );
  expect(container).toContainElement(
    getByText('Seja bem-vindo ao novo Portal')
  );
});
