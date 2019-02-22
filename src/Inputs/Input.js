import React from 'react';
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
  shrinkLabel,
  placeholder,
  ...input
}) => (
  <TextField
    disabled={disabled}
    id="outlined-name"
    name={name}
    placeholder={placeholder || label}
    label={label}
    onChange={onChange}
    InputLabelProps={{
      classes: {
        root: classes[labelClass({ warning, error, success })],
        focused: classes.cssFocused,
      },
      shrink: shrinkLabel,
    }}
    InputProps={{
      classes: {
        root: classes[outlinedInputClass({ warning, error, success })],
        focused: classes.cssFocused,
        notchedOutline: classes.notchedOutline,
      },
      endAdornment: getEndAdornmentIcon({ warning, error, success }),
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
    placeholder,
    ...input
  }) => (
    <TextFieldComponent
      key={key}
      error={!!error}
      fullWidth={fullWidth}
      classes={classes}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
      warning={warning}
      success={success}
      disabled={disabled}
      {...input}
    />
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
  shrinkLabel: undefined,
  placeholder: null,
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
  shrinkLabel: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default Input;
