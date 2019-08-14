import React from 'react';
import PropTypes from 'prop-types';
import { Step1 } from './Step1';
import { Step2 } from './Step2';

import Steps from './Steps';

class TimeslotSelectorComponent extends React.Component {
  constructor(props) {
    super(props);
    const {
      dialog,
      closeOnHandleSchedule,
      onHandleSchedule,
      setDlgOpen,
    } = this.props;

    this.internalOnHandleSchedule =
      dialog && closeOnHandleSchedule
        ? obj => {
            onHandleSchedule(obj);
            this.setState({});
            setDlgOpen(false);
          }
        : onHandleSchedule;
  }

  render() {
    const {
      beforeSteps,
      labels,
      cancelDialog,
      selectedPeople,
      selectedDuration,
      otherProps,
      setSelectedPeople,
      setSelectedDuration,
      changeOtherProps,
    } = this.props;
    const steps = [];

    if (beforeSteps && beforeSteps.length >= 1) {
      beforeSteps.map(bs =>
        steps.push({ label: bs.label, component: bs.component })
      );
    }

    steps.push({
      label: labels.step1Label,
      component: props => (
        <Step1
          key={props.key}
          selectedPeople={props.selectedPeople}
          setSelectedPeople={props.setSelectedPeople}
          selectedDuration={props.selectedDuration}
          setSelectedDuration={props.setSelectedDuration}
          personsAvailabilities={props.personsAvailabilities}
          durations={props.durations}
          classes={props.classes}
          labels={props.labels}
          callNextStep={props.callNextStep}
          callCancel={props.callCancel}
          callPreviousStep={
            beforeSteps && beforeSteps.length > 0
              ? props.callPreviousStep
              : undefined
          }
        />
      ),
    });
    steps.push({
      label: labels.step2Label,
      component: props => (
        <Step2
          key={props.key}
          selectedPeople={props.selectedPeople}
          selectedDuration={props.selectedDuration}
          selectedDate={props.selectedDate}
          selectedTime={props.selectedTime}
          personsAvailabilities={props.personsAvailabilities}
          classes={props.classes}
          labels={props.labels}
          locale={props.locale}
          onHandleSchedule={props.onHandleSchedule}
          callCancel={props.callCancel}
          callPreviousStep={props.callPreviousStep}
          onWeekChange={props.onWeekChange}
          {...props}
        />
      ),
    });

    const props = {
      ...this.props,
      selectedPeople,
      selectedDuration,
      otherProps,
      onHandleSchedule: this.internalOnHandleSchedule,
      setSelectedPeople,
      setSelectedDuration,
      changeOtherProps,
      callCancel: cancelDialog,
    };
    return <Steps steps={steps} {...props} />;
  }
}

TimeslotSelectorComponent.defaultProps = {
  beforeSteps: undefined,
  setDlgOpen: undefined,
  cancelDialog: undefined,
  changeOtherProps: undefined,
  otherProps: undefined,
  selectedPeople: [],
  selectedDuration: undefined,
  closeOnHandleSchedule: undefined,
  selectedDate: '',
  selectedTime: '',
  selectedPerson: '',
};

TimeslotSelectorComponent.propTypes = {
  dialog: PropTypes.bool.isRequired,
  closeOnHandleSchedule: PropTypes.func,
  onHandleSchedule: PropTypes.func.isRequired,
  setSelectedPeople: PropTypes.func.isRequired,
  setSelectedDuration: PropTypes.func.isRequired,
  labels: PropTypes.object.isRequired,
  personsAvailabilities: PropTypes.arrayOf(PropTypes.object).isRequired,
  durations: PropTypes.arrayOf(PropTypes.number).isRequired,
  beforeSteps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
    })
  ),
  setDlgOpen: PropTypes.func,
  cancelDialog: PropTypes.func,
  changeOtherProps: PropTypes.func,
  otherProps: PropTypes.object,
  selectedPeople: PropTypes.arrayOf(PropTypes.string),
  selectedPerson: PropTypes.string,
  selectedDuration: PropTypes.string,
  selectedDate: PropTypes.string,
  selectedTime: PropTypes.string,
};

export default TimeslotSelectorComponent;
