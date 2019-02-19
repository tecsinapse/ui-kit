import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/es/Typography/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { DateTime } from 'luxon';
import Card from '@material-ui/core/es/Card/Card';
import CardContent from '@material-ui/core/es/CardContent/CardContent';
import Chip from '@material-ui/core/es/Chip/Chip';
import { capitalize } from '@material-ui/core/es/utils/helpers';

import { Button } from '../..';
import { WeeklyCalendar } from '../../Calendar/WeeklyCalendar';
import { defaultLabels } from './data-types';

export const Step2 = ({
  classes,
  personsAvailabilities,
  selectedPerson,
  selectedDuration,
  onPreviousStep,
  labels,
}) => {
  const [selectedDate, setSelectedDate] = useState(DateTime.local());
  const availabilitiesByPerson = {};
  personsAvailabilities.forEach(key => {
    availabilitiesByPerson[key.email] = key;
  });
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div>
      <Grid justify="center" container spacing={16}>
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            {labels.selectDayEndTimeLabel}
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <WeeklyCalendar
            currentDate={selectedDate}
            onDayChange={setSelectedDate}
          />
        </Grid>

        <Grid item container xs={12} spacing={8}>
          {selectedPerson.map(key => {
            const person = availabilitiesByPerson[key];
            return (
              <Grid item xs={12}>
                <Card>
                  <CardContent className={classes.availiabilityCardRoot}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      <b>{person.name}</b> {bull}{' '}
                      {capitalize(selectedDate.weekdayLong)}, {selectedDate.day}{' '}
                      de {capitalize(selectedDate.monthLong)} de{' '}
                      {selectedDate.year}
                    </Typography>

                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(av => (
                      <Chip
                        className={classes.availiabilityCardTime}
                        label="00:00"
                      />
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <Grid
        container
        justify="center"
        spacing={16}
        className={classes.stepButtons}
      >
        <Grid item>
          <Button onClick={onPreviousStep}>{labels.buttonLabelprevious}</Button>
        </Grid>
        <Grid item>
          <Button>{labels.buttonLabelSchedule}</Button>
        </Grid>
      </Grid>
    </div>
  );
};

Step2.defaultProps = {};

Step2.propTypes = {
  labels: PropTypes.instanceOf(defaultLabels).isRequired,
  onPreviousStep: PropTypes.func.isRequired,
};
