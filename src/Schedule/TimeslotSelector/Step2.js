import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/es/Typography/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { DateTime } from 'luxon';

import Card from '@material-ui/core/es/Card/Card';
import CardHeader from '@material-ui/core/es/CardHeader/CardHeader';
import Avatar from '@material-ui/core/es/Avatar/Avatar';
import CardContent from '@material-ui/core/es/CardContent/CardContent';
import Chip from '@material-ui/core/es/Chip/Chip';
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
  const availabilitiesByPerson = {};
  personsAvailabilities.forEach(key => {
    availabilitiesByPerson[key.email] = key;
  });

  return (
    <div>
      <Grid justify="center" container>
        <Typography variant="h6">{labels.selectDayEndTimeLabel}</Typography>
      </Grid>
      <Grid justify="center" container>
        <WeeklyCalendar currentDate={DateTime.local()} />
      </Grid>
      <Grid justify="center" container spacing={8}>
        {selectedPerson.map(key => {
          const person = availabilitiesByPerson[key];
          return (
            <Grid item>
              <Card className={classes.availiabilityCard}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      R
                    </Avatar>
                  }
                  title={person.name}
                />
                <CardContent>
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
