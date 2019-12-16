import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { KeyboardTimePicker } from '@material-ui/pickers';
import { useTheme } from '@material-ui/styles';
import { Input } from '@tecsinapse/ui-kit';
import { LocaleContext } from '@tecsinapse/ui-kit/build/LocaleProvider';
import { renderStyledLabel } from '@tecsinapse/ui-kit/build/ThemeProvider';

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
  const theme = useTheme();

  return (
    <KeyboardTimePicker
      format={format}
      margin="normal"
      id={id}
      label={label}
      cancelLabel={renderStyledLabel(cancelLabel, theme.variant)}
      okLabel={renderStyledLabel(okLabel, theme.variant)}
      value={selectedTime}
      onChange={onChange}
      KeyboardButtonProps={{
        'aria-label': 'change time',
      }}
      todayLabel={todayLabel}
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
