import React from 'react';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';
import { inputStyles } from './InputStyles';
import {
  getEndAdornmentIcon,
  labelClass,
  outlinedInputClass,
} from './styleUtils';

export const TextFieldComponent = ({
  classes,
  key,
  label,
  onChange,
  value,
  name,
  warning,
  error,
  success,
  disabled,
  ...input
}) => (
  <TextField
    disabled={disabled}
    id="outlined-name"
    name={name}
    label={label}
    onChange={onChange}
    InputLabelProps={{
      classes: {
        root: classes[labelClass({ warning, error, success })],
        focused: classes.cssFocused,
      },
    }}
    InputProps={{
      classes: {
        root: classes[outlinedInputClass({ warning, error, success })],
        focused: classes.cssFocused,
        notchedOutline: classes.notchedOutline,
      },
      endAdornment: getEndAdornmentIcon({ warning, error, success }),
    }}
    inputProps={{
      className: classes.input,
    }}
    margin="dense"
    value={value}
    error={!!error}
    variant="outlined"
    {...input}
  />
);

const InputUI = withStyles(inputStyles)(
  ({
    classes,
    key,
    fullWidth = false,
    label,
    onChange,
    value,
    name,
    warning,
    error,
    success,
    disabled,
    ...input
  }) => (
    <FormControl key={key} error={!!error} fullWidth={fullWidth}>
      <TextFieldComponent
        classes={classes}
        label={label}
        onChange={onChange}
        value={value}
        name={name}
        warning={warning}
        error={error}
        success={success}
        disabled={disabled}
        {...input}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
);
export const Input = props => <InputUI {...props} />;

Input.defaultProps = {
  fullWidth: false,
  success: false,
  warning: false,
  disabled: false,
  label: null,
  onChange: null,
  error: false,
};
Input.propTypes = {
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default Input;
