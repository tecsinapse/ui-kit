import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/es/Typography/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { DateTime } from 'luxon';
import Card from '@material-ui/core/es/Card/Card';
import CardContent from '@material-ui/core/es/CardContent/CardContent';
import Chip from '@material-ui/core/es/Chip/Chip';

import { WeeklyCalendar } from '../../Calendar/WeeklyCalendar';
import { Button } from '../../Buttons/Button';

const generateTimeSlots = (personAvailabilities, date, duration) => {
  const dateTimeSlots = personAvailabilities.availabilities
    .filter(av => av.date === date.toFormat('yyyy-MM-dd'))
    .map(av => av.timeSlot);
  const timeSlots = [];
  if (!dateTimeSlots.length) {
    return [];
  }

  dateTimeSlots[0].forEach(dateTs => {
    let timeSlot = DateTime.fromISO(dateTs.start);
    const endTime = DateTime.fromISO(dateTs.end);
    while (timeSlot.plus({ minutes: duration }) < endTime) {
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
  onHandleSchedule,
  onWeekChange,
  labels,
  locale,
  callPreviousStep,
  callCancel,
  otherProps,
}) => {
  const [selectedDate, setSelectedDate] = useState(DateTime.local());
  const [selectedPersonTimeSlot, setSelectedPersonTimeSlot] = useState(null);
  const timeSlotsByPerson = mapByPerson(
    personsAvailabilities,
    selectedDate,
    selectedDuration
  );
  const handleDayChange = day => {
    setSelectedDate(day);
    setSelectedPersonTimeSlot(null);
  };
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <React.Fragment>
      <div>
        <Grid justify="center" container spacing={0}>
          <Grid item>
            <WeeklyCalendar
              currentDate={selectedDate}
              onDayChange={handleDayChange}
              onWeekChange={onWeekChange}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.stepContent}>
        <div className={classes.stepContentScrolling}>
          <Grid item container direction="column" spacing={8}>
            {selectedPerson.map(key => {
              const person = timeSlotsByPerson[key];
              return (
                <Grid item key={person.email}>
                  <Card>
                    <CardContent className={classes.availabilityCardRoot}>
                      <Typography variant="body1" color="textSecondary">
                        <b>{person.name}</b> {bull}{' '}
                        {selectedDate
                          .setLocale(locale)
                          .toLocaleString(DateTime.DATE_HUGE)}
                      </Typography>
                      {person.timeSlots.length ? (
                        person.timeSlots.map(ts =>
                          selectedPersonTimeSlot &&
                          ts === selectedPersonTimeSlot.time &&
                          person.email === selectedPersonTimeSlot.email ? (
                            <Chip
                              key={ts}
                              className={classes.availabilityCardTime}
                              label={ts}
                              color="secondary"
                            />
                          ) : (
                            <Chip
                              key={ts}
                              className={classes.availabilityCardTime}
                              label={ts}
                              clickable
                              onClick={() =>
                                setSelectedPersonTimeSlot({
                                  date: selectedDate.toISODate(),
                                  time: ts,
                                  email: person.email,
                                  id: person.id,
                                  duration: selectedDuration,
                                  otherProps,
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
        </div>
      </div>
      <div className={classes.stepButtons}>
        <Grid container alignContent="flex-end" justify="center" spacing={8}>
          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>
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
          <Grid item>
            <Button
              disabled={selectedPersonTimeSlot == null}
              onClick={() =>
                onHandleSchedule && onHandleSchedule(selectedPersonTimeSlot)
              }
            >
              {labels.buttonLabelSchedule}
            </Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

Step2.defaultProps = {
  onWeekChange: {},
  callCancel: undefined,
  otherProps: undefined,
};

Step2.propTypes = {
  labels: PropTypes.object.isRequired,
  onHandleSchedule: PropTypes.func.isRequired,
  onWeekChange: PropTypes.func,
  callPreviousStep: PropTypes.func.isRequired,
  callCancel: PropTypes.func,
  otherProps: PropTypes.object,
};
