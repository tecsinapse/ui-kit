/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MaskedInput from 'react-text-mask';
import clsx from 'clsx';
import { styles } from './styles';
import { maskConfig, useMask } from './masks';

import { GetEndAdornment, labelClass, outlinedInputClass } from './styleUtils';

const TextMaskCustom = props => {
  const { inputRef, mask, ...other } = props;
  const [inputMask, pipeFunc] = useMask(mask);

  if (!mask) {
    return null;
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
  variantDevice = 'auto',
  maxLength,
  ...input
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  let device = variantDevice;

  if (variantDevice === 'auto') {
    if (!matches) {
      device = 'mobile';
    } else {
      device = 'web';
    }
  }

  return (
    <TextField
      disabled={disabled}
      id={`outlined-name-${name}`}
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
          maxLength,
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
      margin={device === 'mobile' ? undefined : 'dense'}
      value={value}
      error={!!error}
      variant="outlined"
      {...input}
    />
  );
};

const useInputUIStyles = makeStyles(styles);

const InputUI = ({
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
  maxLength,
  ...input
}) => {
  const classes = useInputUIStyles();

  return (
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
      maxLength={maxLength}
      {...input}
    />
  );
};

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
  variantDevice: 'auto',
};

const maskProp = PropTypes.oneOfType([
  PropTypes.oneOf([
    'cep',
    'phone',
    'cell',
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
  /** Input mask. `@tecsinapse/ui-kit` provides a preset of masks: 'cep', 'phone', 'cel', 'cpf', 'currency', 'cnpj', 'plate', 'cellphone', 'cpfcnpj', 'date', 'time', 'creditcard', 'cvv', 'mounthyear', 'percentage' and 'year'.
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
  /** Variant for Input display */
  variantDevice: PropTypes.oneOf(['auto', 'web', 'mobile']),
  /** Set maxLength size for Input */
  maxLength: PropTypes.number,
};

export default Input;
