import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { KeyboardTimePicker } from '@material-ui/pickers';
import { Input } from '../Inputs/Input';
import { LocaleContext } from '../LocaleProvider';

export const TimePicker = ({
  selectedTime,
  id,
  label,
  onChange,
  format,
  ...props
}) => {
  const {
    Picker: { todayLabel, okLabel, cancelLabel, clearLabel },
  } = useContext(LocaleContext);

  return (
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
      todayLabel={todayLabel}
      okLabel={okLabel}
      cancelLabel={cancelLabel}
      clearLabel={clearLabel}
      TextFieldComponent={Input}
      {...props}
    />
  );
};

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
