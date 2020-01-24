/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';
import { useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MaskedInput from 'react-text-mask';
import clsx from 'clsx';
import { inputStyles } from './InputStyles';
import {
  CELL_MASK,
  CELL_PHONE_MASK,
  CEP_MASK,
  CNPJ_MASK,
  CPF_CNPJ_MASK,
  CPF_MASK,
  CURRENCY_MASK,
  DATE_MASK,
  maskConfig,
  PERCENTAGE_MASK,
  PHONE_MASK,
  PLATE_MASK,
  TIME_MASK,
  YEAR_MASK,
} from './Masks';

import { GetEndAdornment, labelClass, outlinedInputClass } from './styleUtils';

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
      case 'percentage':
        inputMask = PERCENTAGE_MASK;
        break;
      case 'year':
        inputMask = YEAR_MASK;
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
      pipe={pipeFunc}
      showMask
      {...maskConfig}
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
  endAdornment,
  endAdornmentMargin = true,
  startAdornment,
  variant,
  ...input
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  let device = variant;
  if (variant === 'auto') {
    if (!matches) {
      device = 'mobile';
    } else {
      device = 'web';
    }
  }

  return (
    <TextField
      disabled={disabled}
      id="outlined-name"
      name={name}
      placeholder={placeholder || label}
      label={label}
      onChange={onChange}
      InputLabelProps={{
        classes: {
          root: clsx(classes[labelClass({ warning, error, success })]),
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
          root: clsx(
            classes[outlinedInputClass({ warning, error, success })],
            classes.inputRoot
          ),
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline,
          inputAdornedStart: classes.adornedMarginLeft,
          inputAdornedEnd: classes.adornedMarginRight,
          adornedEnd: classes.adornedMarginEnd,
        },
        startAdornment,
        endAdornment: (
          <GetEndAdornment
            warning={warning}
            error={error}
            success={success}
            endAdornmentMargin={endAdornmentMargin}
            endAdornment={endAdornment}
          />
        ),
      }}
      margin={device === 'web' ? 'dense' : undefined}
      value={value}
      error={!!error}
      variant="outlined"
      {...input}
    />
  );
};

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
    helperText,
    endAdornment,
    startAdornment,
    autoComplete,
    ...input
  }) => (
    <TextFieldComponent
      key={key}
      error={!!error}
      helperText={error || helperText}
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
      endAdornment={endAdornment}
      startAdornment={startAdornment}
      autoComplete={autoComplete}
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
  error: undefined,
  mask: null,
  shrinkLabel: undefined,
  placeholder: null,
  helperText: null,
  endAdornment: null,
  endAdornmentMargin: true,
  startAdornment: null,
  autoComplete: null,
  variant: 'auto',
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
    'percentage',
    'year',
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
  /** Input fill div/screen width */
  fullWidth: PropTypes.bool,
  /** Disable the input */
  disabled: PropTypes.bool,
  /** Input success variant */
  success: PropTypes.bool,
  /** Input warning variant */
  warning: PropTypes.bool,
  /** Input error variant */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Input placeholder label */
  label: PropTypes.string,
  /** Input html name */
  name: PropTypes.string.isRequired,
  /** Fired when input changes */
  onChange: PropTypes.func,
  /** Input mask. `@tecsinapse/ui-kit` provides a preset of masks: 'cep', 'phone', 'cel', 'cpf', 'currency', 'cnpj', 'plate', 'cellphone', 'cpfcnpj', 'date', 'time', 'percentage' and 'year'.
   * See below form more info. */
  mask: maskProp,
  /** Shrink label */
  shrinkLabel: PropTypes.bool,
  /** Placeholder when input is focused */
  placeholder: PropTypes.string,
  /** Helper text place below input */
  helperText: PropTypes.string,
  /** Adornment Icon placed at Input end */
  endAdornment: PropTypes.object,
  /** Put a margin on adornment Icon placed at Input end */
  endAdornmentMargin: PropTypes.bool,
  /** Adornment Icon placed at Input start */
  startAdornment: PropTypes.object,
  /** Autocomplete html specification for text input */
  autoComplete: PropTypes.oneOf(['on', 'off']),
  /** */
  variant: PropTypes.string,
};

export default Input;
