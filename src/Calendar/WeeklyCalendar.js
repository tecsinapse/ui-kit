import React, { useState, useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import PropTypes from 'prop-types';

import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Typography from '@material-ui/core/Typography';
import LuxonUtils from '@date-io/luxon';
import {
  weeklyCalendarStyles as useStyles,
  muiInlineDatePicker,
} from './WeeklyCalendarStyles';

const materialTheme = createMuiTheme(muiInlineDatePicker);

const fillWeekDays = startDate => {
  const weekDaysTemp = [];
  for (let i = 0; i < 7; i++) {
    const day = i === 0 ? startDate : startDate.plus({ days: i });
    weekDaysTemp.push(day);
  }
  return weekDaysTemp;
};

export const WeeklyCalendarComponent = ({
  classes,
  currentDate,
  onDayChange,
  onWeekChange,
  locale,
}) => {
  const [selectedDay, setSelectedDay] = useState(currentDate.setLocale(locale));
  const [weekDays, setWeekDays] = useState(
    fillWeekDays(currentDate.setLocale(locale))
  );

  const handleWeekChange = startDay => {
    const localizedDate = startDay.setLocale(locale);
    if (localizedDate.equals(weekDays[0])) {
      return;
    }
    setWeekDays(fillWeekDays(localizedDate));
  };

  useEffect(() => {
    onWeekChange(weekDays);
    setSelectedDay(weekDays[0]);
  }, [weekDays]);

  useEffect(() => {
    onDayChange(selectedDay);
  }, [selectedDay]);

  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={LuxonUtils} locale={locale}>
        <MuiThemeProvider theme={materialTheme}>
          <InlineDatePicker format="MMMM, yyyy" onChange={handleWeekChange} />
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
      <BottomNavigation
        value={selectedDay}
        onChange={(event, day) =>
          !day.equals(selectedDay) && setSelectedDay(day)
        }
        showLabels
        className={classes.cssButtonNavigation}
      >
        {weekDays.map(day => (
          <BottomNavigationAction
            classes={{
              root: classes.cssButtonNavigationAct,
              wrapper: classes.cssButtonNavigationWrp,
              selected: classes.selected,
            }}
            key={day.day}
            label={
              <div>
                <Typography
                  className={classes.weekDayLabel}
                  color="textSecondary"
                  variant="caption"
                >
                  {day.get('weekdayShort')}
                </Typography>
                <Typography
                  className={classes.weekDayValue}
                  color="textSecondary"
                  variant="body1"
                >
                  {day.day}
                </Typography>
              </div>
            }
            value={day}
          />
        ))}
      </BottomNavigation>
    </div>
  );
};

const WeeklyCalendarUI = ({
  currentDate,
  onDayChange,
  onWeekChange,
  locale,
  ...other
}) => {
  const classes = useStyles();
  return (
    <WeeklyCalendarComponent
      classes={classes}
      currentDate={currentDate}
      onDayChange={onDayChange}
      onWeekChange={onWeekChange}
      locale={locale}
      {...other}
    />
  );
};

export const WeeklyCalendar = props => <WeeklyCalendarUI {...props} />;

WeeklyCalendar.defaultProps = {
  onDayChange: day => {},
  onWeekChange: weekDays => {},
  locale: 'pt-BR',
};

WeeklyCalendar.propTypes = {
  onDayChange: PropTypes.func,
  onWeekChange: PropTypes.func,
  currentDate: PropTypes.object.isRequired,
  locale: PropTypes.string,
};

export default WeeklyCalendar;
