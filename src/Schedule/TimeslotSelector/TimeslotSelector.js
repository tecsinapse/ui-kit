import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { DialogContent, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/es/Dialog/Dialog';
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
  cancelDialog,
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
        cancelDialog={cancelDialog}
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
        cancelDialog={cancelDialog}
        onWeekChange={onWeekChange}
      />
    );
  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepHeader}
        activeStep={step}
        alternativeLabel
      >
        <Step key={STEP_1_KEY}>
          <StepLabel>
            <Typography variant="caption">{labels.step1Label}</Typography>
          </StepLabel>
        </Step>
        <Step key={STEP_2_KEY}>
          <StepLabel>
            <Typography variant="caption">{labels.step2Label}</Typography>
          </StepLabel>
        </Step>
      </Stepper>
      {renderStep(step)}
    </div>
  );
};

export const TimeslotSelector = props => {
  const { dialog, openOpened } = props;
  const [dlgOpen, setDlgOpen] = useState(openOpened);
  const classes = useStyles();
  if (dialog) {
    return (
      <Dialog
        classes={{ paperScrollPaper: classes.paperScrollPaper }}
        maxWidth={false}
        fullWidth
        open={dlgOpen}
        disableEnforceFocus
        closeAfterTransition
      >
        <DialogContent>
          <TimeslotSelectorComponent
            {...props}
            classes={classes}
            setDlgOpen={setDlgOpen}
          />
        </DialogContent>
      </Dialog>
    );
  }
  return <TimeslotSelectorComponent classes={classes} {...props} />;
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
  cancelDialog: undefined,
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
  cancelDialog: PropTypes.func,
  onWeekChange: PropTypes.func,
  closeOnHandleSchedule: PropTypes.bool,
};

export default TimeslotSelector;
