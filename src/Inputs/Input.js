import React from 'react';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';
import { mdiAlertCircle, mdiCheckCircle, mdiCloseCircle } from '@mdi/js';
import Icon from '@mdi/react';
import {
  defaultGreen,
  defaultGreenDarker,
  defaultOrange,
  defaultOrangeDarker,
  defaultRed,
  defaultRedDarker,
} from '../colors';

const stylesError = {
  cssOutlinedInputRed: {
    '&$cssFocused $notchedOutline': {
      borderColor: defaultRed,
    },
    '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
      borderColor: `${defaultRedDarker} !important`,
    },
  },
  cssLabelRed: {
    '&$cssFocused': {
      color: defaultRed,
    },
  },
};
const stylesSuccess = {
  cssOutlinedInputSuccess: {
    '& $notchedOutline': {
      borderColor: defaultGreen,
    },
    '&$cssFocused $notchedOutline': {
      borderColor: defaultGreen,
    },
    '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
      borderColor: `${defaultGreenDarker} !important`,
    },
  },
  cssLabelSuccess: {
    '&$cssFocused': {
      color: defaultGreen,
    },
    color: defaultGreen,
  },
};
const stylesWarning = {
  cssOutlinedInputWarning: {
    '& $notchedOutline': {
      borderColor: defaultOrange,
    },
    '&$cssFocused $notchedOutline': {
      borderColor: defaultOrange,
    },
    '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
      borderColor: `${defaultOrangeDarker} !important`,
    },
  },
  cssLabelWarning: {
    '&$cssFocused': {
      color: defaultOrange,
    },
    color: defaultOrange,
  },
};

const styles = theme => ({
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
  },
  cssLabel: {
    '&$cssFocused': {
      color: theme.palette.secondary.main,
    },
  },
  ...stylesError,
  ...stylesSuccess,
  ...stylesWarning,
  notchedOutline: {},
  cssFocused: {},
});

const outlinedInputClass = ({ success, error, warning }) => {
  if (error) {
    return 'cssOutlinedInputRed';
  }
  if (success) {
    return 'cssOutlinedInputSuccess';
  }
  if (warning) {
    return 'cssOutlinedInputWarning';
  }
  return 'cssOutlinedInput';
};
const labelClass = ({ success, error, warning }) => {
  if (error) {
    return 'cssLabelRed';
  }
  if (success) {
    return 'cssLabelSuccess';
  }
  if (warning) {
    return 'cssLabelWarning';
  }
  return 'cssLabel';
};

function getEndAdornmentIcon({ warning, error, success }) {
  if (error) {
    return <Icon path={mdiCloseCircle} color={defaultRed} size={1} />;
  }
  if (success) {
    return <Icon path={mdiCheckCircle} color={defaultGreen} size={1} />;
  }
  if (warning) {
    return <Icon path={mdiAlertCircle} color={defaultOrange} size={1} />;
  }
  return undefined;
}

const InputUI = withStyles(styles)(
  ({
    classes,
    key,
    error,
    fullWidth = false,
    label,
    onChange,
    value,
    success,
    name,
    warning,
    disabled,
    ...input
  }) => (
    <FormControl key={key} error={!!error} fullWidth={fullWidth}>
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
