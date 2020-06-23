import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { AlertComponent } from './AlertComponent';

const RadioButtonsGroup = ({ color = 'primary' }) => {
  const [value, setValue] = React.useState('female');

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <AlertComponent />
      <FormLabel component="legend" color={color}>
        Gender
      </FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value="female"
          color={color}
          control={<Radio />}
          label="Female"
        />
        <FormControlLabel
          value="male"
          color={color}
          control={<Radio />}
          label="Male"
        />
        <FormControlLabel
          value="other"
          color={color}
          control={<Radio />}
          label="Other"
        />
        <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="(Disabled option)"
        />
      </RadioGroup>
    </FormControl>
  );
};

RadioButtonsGroup.propTypes = {
  /** Select color of components */
  color: PropTypes.oneOf(['primary', 'secondary']),
};

export { RadioButtonsGroup };
