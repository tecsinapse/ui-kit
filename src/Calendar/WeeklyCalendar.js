import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LuxonUtils from '@date-io/luxon';
import { DateTime } from 'luxon';
import { weeklyCalendarStyles } from './WeeklyCalendarStyles';

export const WeeklyCalendarComponent = ({
  classes,
  currentDate,
  onDayChange,
  onWeekChange,
  locale,
}) => {
  const fillWeekDays = startDate => {
    const weekDaysTemp = [];
    for (let i = 0; i < 7; i++) {
      const day = startDate.plus({ days: i }).setLocale(locale);
      weekDaysTemp.push(day);
    }
    return weekDaysTemp;
  };

  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [weekDays, setWeekDays] = useState(fillWeekDays(currentDate));

  const handleWeekChange = startDay => {
    setWeekDays(fillWeekDays(startDay));
    onWeekChange(weekDays);
    setSelectedDay(startDay.setLocale(locale));
    onDayChange(startDay);
  };

  const handleDayChange = (event, day) => {
    setSelectedDay(day);
    onDayChange(day);
  };

  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={LuxonUtils} locale={locale}>
        <InlineDatePicker
          className={classes.cssDatepicker}
          format="MMMM, yyyy"
          onChange={handleWeekChange}
        />
      </MuiPickersUtilsProvider>
      <BottomNavigation
        value={selectedDay}
        onChange={handleDayChange}
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
                <span className={classes.weekDayLabel}>
                  {day.get('weekdayShort')}
                </span>
                <span className={classes.dayLabel}>{day.day}</span>
              </div>
            }
            value={day}
          />
        ))}
      </BottomNavigation>
    </div>
  );
};

const WeeklyCalendarUI = withStyles(weeklyCalendarStyles)(
  ({ classes, currentDate, onDayChange, onWeekChange, locale, ...other }) => (
    <WeeklyCalendarComponent
      classes={classes}
      currentDate={currentDate}
      onDayChange={onDayChange}
      onWeekChange={onWeekChange}
      locale={locale}
      {...other}
    />
  )
);

export const WeeklyCalendar = props => <WeeklyCalendarUI {...props} />;

WeeklyCalendar.defaultProps = {
  onDayChange: day => {},
  onWeekChange: weekDays => {},
  currentDate: DateTime.local(),
  locale: 'pt-BR',
};

WeeklyCalendar.propTypes = {
  onDayChange: PropTypes.func,
  onWeekChange: PropTypes.func,
  currentDate: PropTypes.objectOf(DateTime),
  locale: PropTypes.string,
};

export default WeeklyCalendar;
