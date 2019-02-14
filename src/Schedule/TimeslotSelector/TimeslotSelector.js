import React, { useState } from 'react';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import Typography from '@material-ui/core/Typography';
// import PropTypes from 'prop-types';

import { Button } from '../../Buttons/Button';
import { Step1 } from './Step1';
import { Step2 } from './Step2';

const STEP_1 = '1';
const STEP_2 = '3';

const renderStep = step => (step === STEP_1 ? <Step1 /> : <Step2 />);

const renderButtons = (step, setStep) => {
  if (step === STEP_1) {
    return <Button onClick={() => setStep(STEP_2)}>Avançar</Button>;
  }

  return [
    <Button onClick={() => setStep(STEP_1)}>Voltar</Button>,
    <Button>Agendar</Button>,
  ];
};

export const TimeslotSelector = ({
  currentDate,
  onTimeChange,
  onDayChange,
  onWeekChange,
  onAgentChange,
  locale,
  step1Label,
  step2Label,
  agentLabel,
  timePeriods,
  ...other
}) => {
  const [step, setStep] = useState(STEP_1);

  return (
    <div>
      <Stepper activeStep={step} alternativeLabel>
        <Step key={STEP_1}>
          <StepLabel>{step1Label}</StepLabel>
        </Step>
        <Step key={STEP_2}>
          <StepLabel>{step2Label}</StepLabel>
        </Step>
      </Stepper>
      <div>{renderStep(step)}</div>
      <div>{renderButtons(step, setStep)}</div>
    </div>
  );
};
