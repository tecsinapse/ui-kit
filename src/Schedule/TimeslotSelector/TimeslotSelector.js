import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import PropTypes from 'prop-types';

import { timeslotSelectorStyles as useStyles } from './TimeslotSelectorStyles';
import { Button } from '../../Buttons/Button';
import { Step1 } from './Step1';
import { Step2 } from './Step2';

const STEP_1_KEY = 0;
const STEP_2_KEY = 1;

const renderButtons = (step, setStep) => {
  if (step === STEP_1_KEY) {
    return <Button onClick={() => setStep(STEP_2_KEY)}>Avançar</Button>;
  }

  return [
    <Button onClick={() => setStep(STEP_1_KEY)}>Voltar</Button>,
    <Button>Agendar</Button>,
  ];
};

export const defaultLabels = {
  step1Label: 'Seleção de consultores e tempo de atendimento',
  step2Label: 'Escolha da data e horário de atendimento',
  selectPersonLabel: 'Selecione o(s) consultor(es) e o tempo de atendimento',
  minuteslabel: 'minutos',
};

export const TimeslotSelectorComponent = ({
  classes,
  locale,
  labels,
  personsAvailabilities,
  ...other
}) => {
  const [step, setStep] = useState(STEP_1_KEY);
  const [selectedPerson, setSelectedPerson] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState([]);

  const renderStep = stepActive =>
    stepActive === STEP_1_KEY ? (
      <Step1
        key={STEP_1_KEY}
        selectedPerson={selectedPerson}
        setSelectedPerson={setSelectedPerson}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
        personsAvailabilities={personsAvailabilities}
        classes={classes}
        labels={labels}
      />
    ) : (
      <Step2 personsAvailability={personsAvailabilities} />
    );

  return (
    <div className={classes.root}>
      <Stepper activeStep={step} alternativeLabel>
        <Step key={STEP_1_KEY}>
          <StepLabel>{labels.step1Label}</StepLabel>
        </Step>
        <Step key={STEP_2_KEY}>
          <StepLabel>{labels.step2Label}</StepLabel>
        </Step>
      </Stepper>
      <div className={classes.stepContent}>
        <div className={classes.stepBody}>{renderStep(step)}</div>
        <div className={classes.stepButtons}>
          {renderButtons(step, setStep)}
        </div>
      </div>
    </div>
  );
};

const TimeslotSelectorUI = ({
  locale,
  labels,
  personsAvailabilities,
  ...other
}) => {
  const classes = useStyles();
  return (
    <TimeslotSelectorComponent
      classes={classes}
      locale={locale}
      labels={labels}
      personsAvailabilities={personsAvailabilities}
      {...other}
    />
  );
};

const TimeslotSelector = props => <TimeslotSelectorUI {...props} />;

TimeslotSelector.defaultProps = {
  labels: defaultLabels,
  other: {},
  locale: 'pt-BR',
};

TimeslotSelector.propTypes = {
  labels: PropTypes.instanceOf(defaultLabels),
  personsAvailabilities: PropTypes.arrayOf(PropTypes.object).isRequired,
  locale: PropTypes.string,
  other: PropTypes.object,
};

export default TimeslotSelector;
