import React from 'react';
import { Step1 } from './Step1';
import { Step2 } from './Step2';

import Steps from './Steps';

export class TimeslotSelectorComponent extends React.Component {
  constructor(props) {
    super(props);
    const {
      defaultSelectAllPerson,
      personsAvailabilities,
      defaultDuration,
      dialog,
      closeOnHandleSchedule,
      onHandleSchedule,
      setDlgOpen,
      otherProps: otherPropsDefault,
    } = this.props;
    this.state = {
      selectedPerson: defaultSelectAllPerson
        ? personsAvailabilities.map(person => person.email)
        : [],
      selectedDuration: defaultDuration,
      otherProps: otherPropsDefault || {},
    };

    this.internalOnHandleSchedule =
      dialog && closeOnHandleSchedule
        ? obj => {
            onHandleSchedule(obj);
            this.setState({});
            setDlgOpen(false);
          }
        : onHandleSchedule;

    this.changeSelectedPerson = selectedPerson => {
      this.setState({ selectedPerson });
    };

    this.changeSelectedDuration = selectedDuration => {
      this.setState({ selectedDuration });
    };

    this.changeOtherProps = (name, value) => {
      const { otherProps } = this.state;
      otherProps[name] = value;
      this.setState({ otherProps });
    };
  }

  render() {
    const { beforeSteps, labels } = this.props;

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
          selectedPerson={props.selectedPerson}
          setSelectedPerson={props.setSelectedPerson}
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
          selectedPerson={props.selectedPerson}
          selectedDuration={props.selectedDuration}
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

    const { selectedPerson, selectedDuration, otherProps } = this.state;
    const props = {
      ...this.props,
      selectedPerson,
      selectedDuration,
      otherProps,
      onHandleSchedule: this.internalOnHandleSchedule,
      setSelectedPerson: this.changeSelectedPerson,
      setSelectedDuration: this.changeSelectedDuration,
      changeOtherProps: this.changeOtherProps,
    };
    return <Steps steps={steps} {...props} />;
  }
}
