import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { createMuiTheme } from '@material-ui/core/styles';
import { Step } from '@material-ui/core';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { Wizard } from './Wizard';

const WizardWrapper = () => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <Wizard
      activeStep={activeStep}
      onChange={newStep => {
        if (activeStep === 2) {
          return 'Falha na validação do formulário';
        }
        setActiveStep(newStep);
        return null;
      }}
    >
      <Step title="Step 1">1</Step>
      <Step title="Step 2">
        <div>2</div>
      </Step>
      <Step title="Step 3" warningText="Preencheu todos os dados do usuário?">
        <div>3</div>
      </Step>
      <Step title="Step 4">3</Step>
    </Wizard>
  );
};

storiesOf(`${GROUPS.FORMS}|Wizard`, module)
  .addDecorator(muiTheme(createMuiTheme({ spacing: 12 })))
  .add('wizard 2 steps', () => <WizardWrapper />);
