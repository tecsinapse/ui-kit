/* eslint-disable mdx/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
import { weeklyCalendarStyles as useStyles } from './weeklyCalendarStyles';
import { DatePicker } from '../Picker/DatePicker/DatePicker';
import { PickersProvider } from '../Picker/PickersProvider/PickersProvider';

export const WEEK_DAYS = 7;
const style = { textAlign: 'center' };
const style1 = { display: 'flex' };

export const fillWeekDays = (startDate, days) => {
  const weekDaysTemp = [];

  for (let i = 0; i < days; i++) {
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
    fillWeekDays(currentDate.setLocale(locale), WEEK_DAYS)
  );

  const handleWeekChange = startDay => {
    const localizedDate = startDay.setLocale(locale);

    if (localizedDate.equals(weekDays[0])) {
      return;
    }
    setWeekDays(fillWeekDays(localizedDate, WEEK_DAYS));
  };

  const previousWeek = () => {
    const nextWeekStart = selectedDay.minus({ day: 7 });

    setWeekDays(fillWeekDays(nextWeekStart.setLocale(locale), WEEK_DAYS));
  };

  const nextWeek = () => {
    const nextWeekStart = selectedDay.plus({ day: 7 });

    setWeekDays(fillWeekDays(nextWeekStart.setLocale(locale), WEEK_DAYS));
  };

  useEffect(() => {
    onWeekChange && onWeekChange(weekDays);
    setSelectedDay(weekDays[0]);
  }, [weekDays]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    onDayChange && onDayChange(selectedDay);
  }, [selectedDay]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (event, day) =>
    !day.equals(selectedDay) && setSelectedDay(day);

  return (
    <div className={classes.root}>
      <PickersProvider>
        <DatePicker
          weekly
          selectedDate={selectedDay}
          onChange={newDate => handleWeekChange(newDate.startOf('week'))}
          format="dd/MM/yyyy"
          customTextFieldComponentInput={() => (
            <Typography
              variant="h6"
              style={style}
              color="primary"
              data-testid="week-header"
            >
              {selectedDay.toFormat('MMMM, yyyy')}
            </Typography>
          )}
        />
      </PickersProvider>

      <div style={style1}>
        <Button
          className={classes.cssButtonWeekChange}
          onClick={() => previousWeek()}
        >
          <KeyboardArrowLeft />
        </Button>
        <BottomNavigation
          value={selectedDay}
          onChange={handleChange}
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
        <Button
          className={classes.cssButtonWeekChange}
          onClick={() => nextWeek()}
        >
          <KeyboardArrowRight />
        </Button>
      </div>
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
  /** Day change event handler */
  onDayChange: PropTypes.func,
  /** Week change event handler */
  onWeekChange: PropTypes.func,
  /** Initial date */
  currentDate: PropTypes.object.isRequired,
  /** Locale language code to format date */
  locale: PropTypes.string,
};

export default WeeklyCalendar;
