import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { KeyboardTimePicker } from '@material-ui/pickers';
import { useTheme } from '@material-ui/styles';
import { Input, LocaleContext, renderStyledLabel } from '@tecsinapse/ui-kit';

export const TimePicker = ({
  selectedTime,
  id,
  label,
  onChange,
  format,
  inputVariant,
  ...props
}) => {
  const {
    Picker: { todayLabel, okLabel, cancelLabel, clearLabel },
  } = useContext(LocaleContext);
  const theme = useTheme();

  return (
    <KeyboardTimePicker
      format={format}
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
      inputVariant={inputVariant}
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
  inputVariant: 'outlined',
  fullWidth: undefined,
  disabled: undefined,
};

TimePicker.propTypes = {
  /** Current selected time */
  selectedTime: PropTypes.object.isRequired,
  /** Input id */
  id: PropTypes.string,
  /** Input label */
  label: PropTypes.string,
  /** Change event handler */
  onChange: PropTypes.func,
  /** Time format to be rendered */
  format: PropTypes.string,
  /** Input variant selector */
  inputVariant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
  /** Fill div/screen width */
  fullWidth: PropTypes.bool,
  /** Disable Select */
  disabled: PropTypes.bool,
};
export default TimePicker;
