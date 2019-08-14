import React from 'react';
import PropTypes from 'prop-types';

import { FormControlLabel, Radio } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import RadioGroup from '@material-ui/core/RadioGroup';

import { Select } from '../../Select/Select';
import { Button } from '../../Buttons/Button';

export const Step1 = ({
  classes,
  personsAvailabilities,
  selectedPeople,
  setSelectedPeople,
  selectedDuration,
  setSelectedDuration,
  durations,
  labels,
  callCancel,
  callNextStep,
  callPreviousStep,
}) => {
  const persons = personsAvailabilities.map(person => ({
    value: person.email,
    label: person.name,
  }));

  const radioDurationHandle = event => setSelectedDuration(event.target.value);

  return (
    <div>
      <Select
        itensMaxLenght={3}
        value={selectedPeople}
        options={persons}
        isMulti
        variant="web"
        fullWidth
        onChange={setSelectedPeople}
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
      <div className={classes.stepButtons}>
        <Grid container alignContent="flex-end" justify="center" spacing={2}>
          {callCancel && (
            <Grid item>
              <Button variant="error" onClick={callCancel}>
                {labels.buttonLabelCancel}
              </Button>
            </Grid>
          )}
          {callPreviousStep && (
            <Grid item>
              <Button onClick={callPreviousStep} variant="secondary">
                {labels.buttonLabelprevious}
              </Button>
            </Grid>
          )}
          {callNextStep && (
            <Grid item>
              <Button onClick={callNextStep}>{labels.buttonLabelNext}</Button>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

Step1.defaultProps = {
  callCancel: undefined,
  callPreviousStep: undefined,
};

Step1.propTypes = {
  labels: PropTypes.object.isRequired,
  durations: PropTypes.arrayOf(PropTypes.number).isRequired,
  callNextStep: PropTypes.func.isRequired,
  callCancel: PropTypes.func,
  callPreviousStep: PropTypes.func,
};
