import React, { useState } from 'react';
import { DialogContent } from '@material-ui/core';
import Dialog from '@material-ui/core/es/Dialog/Dialog';
import PropTypes from 'prop-types';

import { timeslotSelectorStyles as useStyles } from './TimeslotSelectorStyles';
import { Step1 } from './Step1';
import { Step2 } from './Step2';

import { defaultLabels } from './data-types';
import Steps from './Steps';

export const TimeslotSelectorComponent = ({
  beforeSteps,
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
  const steps = [];

  if (beforeSteps && beforeSteps.length >= 1) {
    beforeSteps.map(bs =>
      steps.push({ label: bs.label, component: bs.component })
    );
  }

  steps.push({
    label: labels.step1Label,
    component: ({ key, callCancel, callNextStep, callPreviousStep }) => (
      <Step1
        key={key}
        selectedPerson={selectedPerson}
        setSelectedPerson={setSelectedPerson}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
        personsAvailabilities={personsAvailabilities}
        durations={durations}
        classes={classes}
        labels={labels}
        callNextStep={callNextStep}
        callCancel={callCancel}
        callPreviousStep={
          beforeSteps && beforeSteps.length > 0 && callPreviousStep
        }
      />
    ),
  });
  steps.push({
    label: labels.step2Label,
    component: ({ key, callCancel, callPreviousStep }) => (
      <Step2
        key={key}
        selectedPerson={selectedPerson}
        selectedDuration={selectedDuration}
        personsAvailabilities={personsAvailabilities}
        classes={classes}
        labels={labels}
        locale={locale}
        onHandleSchedule={internalOnHandleSchedule}
        callCancel={callCancel}
        callPreviousStep={callPreviousStep}
        onWeekChange={onWeekChange}
      />
    ),
  });

  return <Steps steps={steps} classes={classes} callCancel={cancelDialog} />;
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
