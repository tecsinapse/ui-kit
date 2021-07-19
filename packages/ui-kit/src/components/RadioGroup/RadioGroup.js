import React from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup as RadioGroupUI,
} from '@material-ui/core';
import PropTypes from 'prop-types';

export const RadioGroup = ({ onChange, options, required, value }) => (
  <FormControl required={required}>
    <RadioGroupUI
      value={value}
      name="options"
      onChange={event => onChange(event.target.value)}
    >
      {options &&
        options.map(item => (
          <FormControlLabel
            control={
              <Radio
                color={item.color}
                disabled={item.disabled}
                id={item.id}
                size={item.size}
              />
            }
            label={item.label}
            labelPlacement={item.labelPlacement}
            value={item.value}
          />
        ))}
    </RadioGroupUI>
  </FormControl>
);

RadioGroup.propTypes = {
  /** Change event handler */
  onChange: PropTypes.func,
  /** Array of options to render radio type inputs.
   * Each object receives the following attributes:
   * `color: string`,
   * `disabled: boolean`,
   * `id: string`,
   * `label: string`,
   * `labelPlacement: 'start' | 'end'`,
   * `name: string`,
   * and `size: 'small' | 'medium'`,   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      disabled: PropTypes.bool,
      id: PropTypes.string,
      label: PropTypes.string,
      labelPlacement: PropTypes.oneOf(['start', 'end']),
      name: PropTypes.string,
      size: PropTypes.oneOf(['small', 'medium']),
    })
  ),
  /** Property defines if the component are required or not */
  required: PropTypes.bool,
  /** Property defines the component value */
  value: PropTypes.string,
};
