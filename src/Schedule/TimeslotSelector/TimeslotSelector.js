import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/es/Dialog/Dialog';
import Paper from '@material-ui/core/Paper';

import StepLabel from '@material-ui/core/StepLabel';
import PropTypes from 'prop-types';

import { timeslotSelectorStyles as useStyles } from './TimeslotSelectorStyles';
import { Step1 } from './Step1';
import { Step2 } from './Step2';

import { defaultLabels } from './data-types';

const STEP_1_KEY = 0;
const STEP_2_KEY = 1;

export const TimeslotSelectorComponent = ({
  classes,
  locale,
  labels,
  personsAvailabilities,
  durations,
  defaultDuration,
  defaultSelectAllPerson,
  onHandleSchedule,
  onWeekChange,
  dialog,
  closeOnHandleSchedule,
  setDlgOpen,
  ...other
}) => {
  const [step, setStep] = useState(STEP_1_KEY);
  const [selectedPerson, setSelectedPerson] = useState(
    defaultSelectAllPerson
      ? personsAvailabilities.map(person => person.email)
      : []
  );
  const [selectedDuration, setSelectedDuration] = useState(defaultDuration);
  const internalOnHandleSchedule =
    dialog && closeOnHandleSchedule
      ? obj => {
          onHandleSchedule(obj);
          setDlgOpen(false);
        }
      : onHandleSchedule;

  const renderStep = stepActive =>
    stepActive === STEP_1_KEY ? (
      <Step1
        key={STEP_1_KEY}
        selectedPerson={selectedPerson}
        setSelectedPerson={setSelectedPerson}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
        personsAvailabilities={personsAvailabilities}
        durations={durations}
        classes={classes}
        labels={labels}
        onNextStep={() => setStep(STEP_2_KEY)}
      />
    ) : (
      <Step2
        key={STEP_2_KEY}
        selectedPerson={selectedPerson}
        selectedDuration={selectedDuration}
        personsAvailabilities={personsAvailabilities}
        classes={classes}
        labels={labels}
        onPreviousStep={() => setStep(STEP_1_KEY)}
        locale={locale}
        onHandleSchedule={internalOnHandleSchedule}
        onWeekChange={onWeekChange}
      />
    );

  return (
    <Paper className={classes.root} style={other.style}>
      <Grid container justify="center">
        <Grid item>
          <Stepper activeStep={step} alternativeLabel>
            <Step key={STEP_1_KEY}>
              <StepLabel>{labels.step1Label}</StepLabel>
            </Step>
            <Step key={STEP_2_KEY}>
              <StepLabel>{labels.step2Label}</StepLabel>
            </Step>
          </Stepper>
          <div className={classes.stepContent}>{renderStep(step)}</div>
        </Grid>
      </Grid>
    </Paper>
  );
};

const TimeslotSelectorUI = ({
  locale,
  labels,
  personsAvailabilities,
  durations,
  defaultDuration,
  defaultSelectAllPerson,
  onHandleSchedule,
  onWeekChange,
  dialog,
  closeOnHandleSchedule,
  setDlgOpen,
  ...other
}) => {
  const classes = useStyles();
  return (
    <TimeslotSelectorComponent
      classes={classes}
      locale={locale}
      labels={labels}
      personsAvailabilities={personsAvailabilities}
      durations={durations}
      onHandleSchedule={onHandleSchedule}
      onWeekChange={onWeekChange}
      defaultDuration={defaultDuration}
      defaultSelectAllPerson={defaultSelectAllPerson}
      dialog={dialog}
      closeOnHandleSchedule={closeOnHandleSchedule}
      setDlgOpen={setDlgOpen}
      {...other}
    />
  );
};

export const TimeslotSelector = props => {
  const { dialog, openOpened } = props;
  const [dlgOpen, setDlgOpen] = useState(openOpened);
  if (dialog) {
    return (
      <Dialog open={dlgOpen} disableEnforceFocus>
        <TimeslotSelectorUI {...props} setDlgOpen={setDlgOpen} />
      </Dialog>
    );
  }
  return <TimeslotSelectorUI {...props} />;
};

TimeslotSelector.defaultProps = {
  labels: defaultLabels,
  other: {},
  locale: 'pt-BR',
  defaultDuration: undefined,
  defaultSelectAllPerson: false,
  dialog: false,
  openOpened: false,
  onWeekChange: {},
  closeOnHandleSchedule: true,
};

TimeslotSelector.propTypes = {
  labels: PropTypes.object,
  personsAvailabilities: PropTypes.arrayOf(PropTypes.object).isRequired,
  locale: PropTypes.string,
  other: PropTypes.object,
  durations: PropTypes.arrayOf(PropTypes.number).isRequired,
  defaultDuration: PropTypes.number,
  defaultSelectAllPerson: PropTypes.bool,
  dialog: PropTypes.bool,
  openOpened: PropTypes.bool,
  onHandleSchedule: PropTypes.func.isRequired,
  onWeekChange: PropTypes.func,
  closeOnHandleSchedule: PropTypes.bool,
};

export default TimeslotSelector;
