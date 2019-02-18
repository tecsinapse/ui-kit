import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/es/Typography/Typography';
import { FormControlLabel, Radio } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import RadioGroup from '@material-ui/core/es/RadioGroup/RadioGroup';

import { Select } from '../../Select/Select';

export const Step1 = ({
  classes,
  personsAvailabilities,
  selectedPerson,
  setSelectedPerson,
  selectedDuration,
  setSelectedDuration,
  durations,
  labels,
}) => {
  const persons = personsAvailabilities.map(person => ({
    value: person.email,
    label: person.name,
  }));

  const radioDurationHandle = event =>
    setSelectedDuration(Number(event.target.value));

  return (
    <div style={{ width: '92%' }}>
      <Typography variant="h6">{labels.selectPersonLabel}</Typography>
      <Select
        maxLenghtOption={3}
        value={selectedPerson}
        options={persons}
        isMulti
        variant="web"
        fullWidth
        onChange={setSelectedPerson}
      />
      <Grid container justify="center">
        <RadioGroup
          name="durationSet"
          value={selectedDuration}
          onChange={radioDurationHandle}
          row
        >
          {durations.map(duration => (
            <FormControlLabel
              value={duration}
              control={<Radio />}
              label={`${duration} ${labels.minuteslabel}`}
            />
          ))}
        </RadioGroup>
      </Grid>
    </div>
  );
};

Step1.defaultProps = {
  durations: [15, 20, 30],
};

Step1.propTypes = {
  durations: PropTypes.arrayOf(PropTypes.number),
};
