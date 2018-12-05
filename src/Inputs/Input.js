import React from 'react';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';

const styles = theme => ({
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
  },
  input: {
    padding: 12,
  },
  notchedOutline: {},
  cssLabel: {
    '&$cssFocused': {
      color: theme.palette.secondary.main,
    },
  },
  cssFocused: {},
});

const InputUI = withStyles(styles)(
  ({ classes, key, error, fullWidth = false, label, onChange, value }) => (
    <FormControl key={key} error={!!error} fullWidth={fullWidth}>
      <TextField
        id="outlined-name"
        label={label}
        onChange={onChange}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          },
        }}
        inputProps={{
          className: classes.input,
        }}
        margin="normal"
        value={value}
        error={!!error}
        variant="outlined"
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
);
export const Input = props => <InputUI {...props} />;

Input.defaultProps = {
  fullWidth: false,
  error: null,
  label: null,
  onChange: null,
};
Input.propTypes = {
  fullWidth: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
