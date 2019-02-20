import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/es/Typography/Typography';

import { FormControlLabel, Radio } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import RadioGroup from '@material-ui/core/es/RadioGroup/RadioGroup';

import { Select } from '../../Select/Select';
import { Button } from '../../Buttons/Button';

export const Step1 = ({
  classes,
  personsAvailabilities,
  selectedPerson,
  setSelectedPerson,
  selectedDuration,
  setSelectedDuration,
  onNextStep,
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
    <div>
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
          value={String(selectedDuration)}
          onChange={radioDurationHandle}
          row
        >
          {durations.map(duration => (
            <FormControlLabel
              key={duration}
              value={String(duration)}
              control={<Radio />}
              label={`${duration} ${labels.minuteslabel}`}
            />
          ))}
        </RadioGroup>
      </Grid>
      <Divider variant="middle" />
      <Grid container justify="center" className={classes.stepButtons}>
        <Button onClick={onNextStep}>{labels.buttonLabelNext}</Button>
      </Grid>
    </div>
  );
};

Step1.defaultProps = {};

Step1.propTypes = {
  labels: PropTypes.object.isRequired,
  durations: PropTypes.arrayOf(PropTypes.number).isRequired,
};
