import React from 'react';
import Radio from '@material-ui/core/Radio';

const RadioButton = ({ checked, disabled, required, value }) => (
  <Radio
    checked={checked}
    disabled={disabled}
    required={required}
    value={value}
  />
);

RadioButton.defaultProps = {
  checked: false,
  disabled: false,
  required: false,
  value: null,
};

export default RadioButton;
