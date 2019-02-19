import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/es/Typography/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { DateTime } from 'luxon';
import Card from '@material-ui/core/es/Card/Card';
import CardContent from '@material-ui/core/es/CardContent/CardContent';
import Chip from '@material-ui/core/es/Chip/Chip';

import { Button } from '../..';
import { WeeklyCalendar } from '../../Calendar/WeeklyCalendar';
import { defaultLabels } from './data-types';

const generateTimeSlots = (personAvailabilities, date, duration) => {
  const dateAvailabilities = personAvailabilities.availabilities
    .filter(av => av.date === date.toFormat('yyyy-MM-dd'))
    .map(av => av.availabilities);
  const timeSlots = [];
  if (!dateAvailabilities.length) {
    return [];
  }

  dateAvailabilities[0].forEach(dateAvs => {
    let timeSlot = DateTime.fromISO(dateAvs.start);
    const endTime = DateTime.fromISO(dateAvs.end);
    while (timeSlot < endTime) {
      timeSlots.push(timeSlot.toLocaleString(DateTime.TIME_SIMPLE));
      timeSlot = timeSlot.plus({ minutes: duration });
    }
  });
  return timeSlots;
};

const mapByPerson = (personsAvailabilities, date, duration) => {
  const map = [];
  personsAvailabilities.forEach(pa => {
    map[pa.email] = {
      name: pa.name,
      email: pa.email,
      timeSlots: generateTimeSlots(pa, date, duration),
    };
  });

  return map;
};

export const Step2 = ({
  classes,
  personsAvailabilities,
  selectedPerson,
  selectedDuration,
  onPreviousStep,
  labels,
  locale,
}) => {
  const [selectedDate, setSelectedDate] = useState(DateTime.local());
  // const [selectedTime, setSelectedTime] = useState(null);
  const timeSlotsByPerson = mapByPerson(
    personsAvailabilities,
    selectedDate,
    selectedDuration
  );
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
            const person = timeSlotsByPerson[key];
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
                      {selectedDate
                        .setLocale(locale)
                        .toLocaleString(DateTime.DATE_HUGE)}
                    </Typography>
                    {person.timeSlots.length ? (
                      person.timeSlots.map(ts => (
                        <Chip
                          className={classes.availiabilityCardTime}
                          label={ts}
                        />
                      ))
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom="gutterBottom"
                      >
                        {labels.noTimeSlotAvailable}
                      </Typography>
                    )}
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
