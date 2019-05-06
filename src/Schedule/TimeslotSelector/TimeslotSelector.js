import React from 'react';
import { withStyles } from '@material-ui/styles';
import { DialogContent } from '@material-ui/core';
import Dialog from '@material-ui/core/es/Dialog/Dialog';
import PropTypes from 'prop-types';

import { timeslotSelectorStyles } from './TimeslotSelectorStyles';

import { defaultLabels } from './data-types';
import TimeslotSelectorComponent from './TimeslotSelectorComponent';

class TimeslotSelector extends React.Component {
  constructor(props) {
    super(props);
    const {
      openOpened,
      personsEmailSelected,
      defaultDuration,
      otherProps: otherPropsDefault,
    } = this.props;

    this.state = {
      dlgOpen: openOpened,
      selectedPeople: personsEmailSelected || [],
      selectedDuration: defaultDuration,
      otherProps: otherPropsDefault || {},
    };
    this.changeSelectedPeople = selectedPeople => {
      this.setState({ selectedPeople: [...selectedPeople] });
    };

    this.changeSelectedDuration = selectedDuration => {
      this.setState({ selectedDuration });
    };

    this.changeOtherProps = (name, value) => {
      const { otherProps } = this.state;
      otherProps[name] = value;
      this.setState({ otherProps: { ...otherProps } });
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { personsEmailSelected: personsEmailSelectedPrev } = this.props;
    const { personsEmailSelected } = nextProps;
    if (personsEmailSelectedPrev !== personsEmailSelected) {
      this.setState({ selectedPeople: personsEmailSelected });
    }
  }

  render() {
    const {
      dialog,
      classes,
      labels,
      personsAvailabilities,
      durations,
      selectedEmailPerson,
    } = this.props;
    const {
      dlgOpen,
      selectedPeople,
      selectedDuration,
      otherProps,
    } = this.state;
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
              {...this.props}
              classes={classes}
              setDlgOpen={value => this.setState({ dlgOpen: value })}
              selectedPeople={selectedPeople}
              selectedDuration={selectedDuration}
              otherProps={otherProps}
              setSelectedPeople={this.changeSelectedPeople}
              setSelectedDuration={this.changeSelectedDuration}
              changeOtherProps={this.changeOtherProps}
              labels={labels}
              personsAvailabilities={personsAvailabilities}
            />
          </DialogContent>
        </Dialog>
      );
    }
    return (
      <TimeslotSelectorComponent
        {...this.props}
        classes={classes}
        selectedPeople={selectedPeople}
        selectedDuration={selectedDuration}
        otherProps={otherProps}
        setSelectedPeople={this.changeSelectedPeople}
        setSelectedDuration={this.changeSelectedDuration}
        changeOtherProps={this.changeOtherProps}
        labels={labels}
        personsAvailabilities={personsAvailabilities}
        durations={durations}
        selectedPerson={selectedEmailPerson}
      />
    );
  }
}

TimeslotSelector.defaultProps = {
  labels: defaultLabels,
  other: {},
  locale: 'pt-BR',
  defaultDuration: undefined,
  dialog: false,
  openOpened: false,
  onWeekChange: {},
  closeOnHandleSchedule: true,
  cancelDialog: undefined,
  beforeSteps: undefined,
  otherProps: undefined,
  selectedDate: '',
  selectedTime: '',
  personsEmailSelected: [],
  selectedEmailPerson: '',
};

TimeslotSelector.propTypes = {
  labels: PropTypes.object,
  personsAvailabilities: PropTypes.arrayOf(PropTypes.object).isRequired,
  personsEmailSelected: PropTypes.arrayOf(PropTypes.string),
  selectedEmailPerson: PropTypes.string,
  locale: PropTypes.string,
  other: PropTypes.object,
  durations: PropTypes.arrayOf(PropTypes.number).isRequired,
  defaultDuration: PropTypes.number,
  dialog: PropTypes.bool,
  openOpened: PropTypes.bool,
  onHandleSchedule: PropTypes.func.isRequired,
  cancelDialog: PropTypes.func,
  onWeekChange: PropTypes.func,
  closeOnHandleSchedule: PropTypes.bool,
  otherProps: PropTypes.object,
  selectedDate: PropTypes.string,
  selectedTime: PropTypes.string,
  beforeSteps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
    })
  ),
};

export default withStyles(timeslotSelectorStyles)(TimeslotSelector);
