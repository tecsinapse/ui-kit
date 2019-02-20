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
      timeSlots.push(timeSlot.toLocaleString(DateTime.TIME_24_SIMPLE));
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
  onHandleSchedule,
  onWeekChange,
  labels,
  locale,
}) => {
  const [selectedDate, setSelectedDate] = useState(DateTime.local());
  const [selectedPersonTimeSlot, setSelectedPersonTimeSlot] = useState({});
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
            onWeekChange={onWeekChange}
          />
        </Grid>

        <Grid item container xs={12} spacing={8}>
          {selectedPerson.map(key => {
            const person = timeSlotsByPerson[key];
            return (
              <Grid item xs={12} key={person.email}>
                <Card>
                  <CardContent className={classes.availiabilityCardRoot}>
                    <Typography variant="body1" color="textSecondary">
                      <b>{person.name}</b> {bull}{' '}
                      {selectedDate
                        .setLocale(locale)
                        .toLocaleString(DateTime.DATE_HUGE)}
                    </Typography>
                    {person.timeSlots.length ? (
                      person.timeSlots.map(ts =>
                        ts === selectedPersonTimeSlot.timeSlot &&
                        person.email === selectedPersonTimeSlot.email ? (
                          <Chip
                            key={ts}
                            className={classes.availiabilityCardTime}
                            label={ts}
                            color="secondary"
                          />
                        ) : (
                          <Chip
                            key={ts}
                            className={classes.availiabilityCardTime}
                            label={ts}
                            clickable
                            onClick={() =>
                              setSelectedPersonTimeSlot({
                                date: selectedDate.toISODate(),
                                timeSlot: ts,
                                email: person.email,
                              })
                            }
                          />
                        )
                      )
                    ) : (
                      <Typography variant="body1" color="textSecondary">
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
          <Button
            onClick={() =>
              onHandleSchedule && onHandleSchedule(selectedPersonTimeSlot)
            }
          >
            {labels.buttonLabelSchedule}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

Step2.defaultProps = {
  onWeekChange: {},
};

Step2.propTypes = {
  labels: PropTypes.object.isRequired,
  onPreviousStep: PropTypes.func.isRequired,
  onHandleSchedule: PropTypes.func.isRequired,
  onWeekChange: PropTypes.func,
};