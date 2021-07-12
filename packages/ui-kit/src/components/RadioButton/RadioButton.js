import React from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';
import PropTypes from 'prop-types';

export const RadioButton = ({
  checked,
  disabled,
  disableRipple,
  label,
  labelPlacement,
  onChange,
  name,
  required,
  value,
}) => (
  <FormControlLabel
    control={
      <Radio
        checked={checked}
        disableRipple={disableRipple}
        name={name}
        onChange={event => onChange(event)}
        required={required}
        value={value}
      />
    }
    disabled={disabled}
    label={label}
    labelPlacement={labelPlacement}
  />
);

RadioButton.defaultProps = {
  checked: false,
  disabled: false,
  disableRipple: false,
  labelPlacement: 'end',
  name: null,
  required: false,
  value: null,
};

RadioButton.propTypes = {
  /** Defines if the component start checked or unchecked. */
  checked: PropTypes.bool,
  /** Disable the component. */
  disabled: PropTypes.bool,
  /** Disable the component ripple effect. */
  disableRipple: PropTypes.bool,
  /** Defines the component text label. */
  label: PropTypes.string,
  /** Defines the component place. Possible values are: "top", "start", "bottom" and "end". */
  labelPlacement: PropTypes.string,
  /** Defines the callback function that are triggered when component state is changed. */
  onChange: PropTypes.func,
  /** Defines the component name. */
  name: PropTypes.bool,
  /** Defines if component are required or not. */
  required: PropTypes.bool,
  /** Defines the component value. */
  value: PropTypes.any,
};
