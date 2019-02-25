import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';
import MaskedInput from 'react-text-mask';
import { inputStyles } from './InputStyles';
import {
  PHONE_MASK,
  CELL_MASK,
  CPF_MASK,
  CURRENCY_MASK,
  CNPJ_MASK,
  PLATE_MASK,
  CELL_PHONE_MASK,
  CPF_CNPJ_MASK,
  DATE_MASK,
  TIME_MASK,
  CEP_MASK,
} from './Masks';

import {
  getEndAdornmentIcon,
  labelClass,
  outlinedInputClass,
} from './styleUtils';

const TextMaskCustom = props => {
  const { inputRef, mask, ...other } = props;
  let inputMask;
  let pipeFunc;

  if (!mask) {
    return null;
  }

  if (typeof mask === 'string') {
    switch (mask) {
      case 'cep':
        inputMask = CEP_MASK;
        break;
      case 'phone':
        inputMask = PHONE_MASK;
        break;
      case 'cell':
        inputMask = CELL_MASK;
        break;
      case 'cpf':
        inputMask = CPF_MASK;
        break;
      case 'currency':
        inputMask = CURRENCY_MASK;
        break;
      case 'cnpj':
        inputMask = CNPJ_MASK;
        break;
      case 'plate':
        inputMask = PLATE_MASK;
        pipeFunc = conformedValue => conformedValue.toUpperCase();
        break;
      case 'cellphone':
        inputMask = CELL_PHONE_MASK;
        break;
      case 'cpfcnpj':
        inputMask = CPF_CNPJ_MASK;
        break;
      case 'date':
        inputMask = DATE_MASK;
        break;
      case 'time':
        inputMask = TIME_MASK;
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
      pipe={pipeFunc}
      showMask
      guide={false}
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
    placeholder,
    mask,
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
      mask={mask}
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
  mask: null,
  shrinkLabel: undefined,
  placeholder: null,
};

const maskProp = PropTypes.oneOfType([
  PropTypes.oneOf([
    'cep',
    'phone',
    'cel',
    'cpf',
    'currency',
    'cnpj',
    'plate',
    'cellphone',
    'cpfcnpj',
    'date',
    'time',
  ]),
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
  shrinkLabel: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default Input;
