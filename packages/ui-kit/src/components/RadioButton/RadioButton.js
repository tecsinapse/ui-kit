import React from 'react';
import Radio from '@material-ui/core/Radio';

const RadioButtonUI = ({ checked, disabled, required, value }) => (
  <Radio
    checked={checked}
    disabled={disabled}
    required={required}
    value={value}
  />
);

export const RadioButton = <RadioButtonUI {...props} />;

RadioButton.defaultProps = {
  checked: false,
  disabled: false,
  required: false,
  value: null,
};

export default RadioButton;
