import React from 'react';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';
import MaskedInput from 'react-text-mask';
import { inputStyles } from './InputStyles';
import { PHONE_MASK, CEL_MASK, CPF_MASK, CURRENCY_MASK } from './Masks';

import {
  getEndAdornmentIcon,
  labelClass,
  outlinedInputClass,
} from './styleUtils';

const TextMaskCustom = props => {
  const { inputRef, mask, ...other } = props;
  let inputMask = null;

  if (!mask) {
    return null;
  }

  if (typeof mask === 'string') {
    switch (mask) {
      case 'phone':
        inputMask = PHONE_MASK;
        break;
      case 'cel':
        inputMask = CEL_MASK;
        break;
      case 'cpf':
        inputMask = CPF_MASK;
        break;
      case 'currency':
        inputMask = CURRENCY_MASK;
        break;
      default:
        return null;
    }
  } else {
    inputMask = mask;
  }

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={inputMask}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

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
  mask,
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
      inputComponent: mask ? TextMaskCustom : undefined,
      inputProps: {
        mask,
      },
      className: classes.input,
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
    mask,
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
        mask={mask}
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
  mask: null,
};

const maskProp = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.array,
  PropTypes.func,
  PropTypes.bool,
  PropTypes.shape({
    mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    pipe: PropTypes.func,
  }),
]);

Input.propTypes = {
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  mask: maskProp,
};

export default Input;
