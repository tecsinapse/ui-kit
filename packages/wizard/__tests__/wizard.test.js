import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Step } from '@material-ui/core';
import { Wizard } from 'Wizard';
import { TestProvider } from 'TestProvider';

test('Render Wizard', () => {
  let activeStep = 0;

  const { container, getByText } = render(
    <TestProvider>
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
        <Step title="Step 3" warningText="Preencheu todos os dados do usuário?">
          <div>3</div>
        </Step>
        <Step title="Step 4">4</Step>
      </Wizard>
    </TestProvider>
  );

  expect(container).toContainElement(getByText('Passo 1'));
});
