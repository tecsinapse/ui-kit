import React from 'react';
import { withStyles } from '@material-ui/styles';
import { DialogContent } from '@material-ui/core';
import Dialog from '@material-ui/core/es/Dialog/Dialog';
import PropTypes from 'prop-types';

import { timeslotSelectorStyles } from './TimeslotSelectorStyles';

import { defaultLabels } from './data-types';
import { TimeslotSelectorComponent } from './TimeslotSelectorComponent';

class TimeslotSelector extends React.Component {
  constructor(props) {
    super(props);
    const { openOpened } = this.props;
    this.state = {
      dlgOpen: openOpened,
    };
  }

  render() {
    const { dialog, classes } = this.props;
    const { dlgOpen } = this.state;
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
            />
          </DialogContent>
        </Dialog>
      );
    }
    return <TimeslotSelectorComponent classes={classes} {...this.props} />;
  }
}

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
  beforeSteps: undefined,
  otherProps: undefined,
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
  otherProps: PropTypes.object,
  beforeSteps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
    })
  ),
};

export default withStyles(timeslotSelectorStyles)(TimeslotSelector);
