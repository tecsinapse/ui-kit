import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AutoRotatingCarousel, Slide } from '../src';
import { TestProvider } from '../../../utils/TestProvider';

test('Render Carousel', () => {
  const { container, getByText } = render(
    <TestProvider>
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
    </TestProvider>
  );

  expect(container).toContainElement(
    getByText('Seja bem-vindo ao novo Portal')
  );
});
