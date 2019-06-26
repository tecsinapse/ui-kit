import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardTimePicker } from '@material-ui/pickers';

export const TimePicker = ({
  selectedTime,
  id,
  label,
  onChange,
  format,
  ...props
}) => (
  <KeyboardTimePicker
    format={format}
    margin="normal"
    id={id}
    label={label}
    value={selectedTime}
    onChange={onChange}
    KeyboardButtonProps={{
      'aria-label': 'change time',
    }}
    {...props}
  />
);

TimePicker.defaultProps = {
  label: 'Time Picker',
  id: 'timepicker-id',
  onChange: () => {},
  format: undefined,
};

TimePicker.propTypes = {
  selectedTime: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  format: PropTypes.string,
};
export default TimePicker;
