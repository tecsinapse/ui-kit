import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker } from '@material-ui/pickers';

export const DatePicker = ({
  selectedDate,
  id,
  label,
  onChange,
  format,
  ...props
}) => (
  <KeyboardDatePicker
    format={format}
    margin="normal"
    id={id}
    label={label}
    value={selectedDate}
    onChange={onChange}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
    autoOk
    {...props}
  />
);

DatePicker.defaultProps = {
  label: 'Date Picker',
  id: 'datepicker-id',
  onChange: () => {},
  format: undefined,
};

DatePicker.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  format: PropTypes.string,
};
export default DatePicker;
