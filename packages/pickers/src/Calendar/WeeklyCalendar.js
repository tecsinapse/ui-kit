/* eslint-disable mdx/no-unused-expressions */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
import {
  add,
  format,
  formatISO,
  getDay,
  isEqual,
  parseISO,
  startOfWeek,
  sub,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { styles as useStyles } from './styles';
import DatePicker from '../Picker/DatePicker';
import PickersProvider from '../Picker/PickersProvider';
import { fillWeekDays, WEEK_DAYS } from './utils';

const style = { textAlign: 'center' };
const style1 = { display: 'flex' };

const daysOfTheWeek = {
  0: 'Dom',
  1: 'Seg',
  2: 'Ter',
  3: 'Qua',
  4: 'Qui',
  5: 'Sex',
  6: 'Sab',
};

const WeeklyCalendarComponent = ({
  classes,
  currentDate,
  onDayChange,
  onWeekChange,
  locale,
}) => {
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [weekDays, setWeekDays] = useState(
    fillWeekDays(startOfWeek(currentDate), WEEK_DAYS)
  );

  const handleWeekChange = startDay => {
    const localizedDate = startDay;

    if (isEqual(localizedDate, weekDays[0])) {
      return;
    }
    setWeekDays(fillWeekDays(localizedDate, WEEK_DAYS));
  };

  const previousWeek = useCallback(() => {
    const nextWeekStart = sub(selectedDay, {
      days: 7 + getDay(selectedDay),
    });

    setWeekDays(fillWeekDays(nextWeekStart, WEEK_DAYS));
  }, [selectedDay]);

  const nextWeek = useCallback(() => {
    const nextWeekStart = add(selectedDay, {
      days: 7 - getDay(selectedDay),
    });

    setWeekDays(fillWeekDays(nextWeekStart, WEEK_DAYS));
  }, [selectedDay]);

  useEffect(() => {
    onWeekChange && onWeekChange(weekDays);
  }, [weekDays]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    onDayChange && onDayChange(selectedDay);
  }, [selectedDay]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (event, day) =>
    !isEqual(parseISO(day), selectedDay) && setSelectedDay(parseISO(day));

  return (
    <div className={classes.root}>
      <PickersProvider>
        <DatePicker
          weekly
          selectedDate={selectedDay}
          onChange={newDate => handleWeekChange(startOfWeek(newDate))}
          format="dd/MM/yyyy"
          customTextFieldComponentInput={() => (
            <Typography
              variant="h6"
              style={style}
              color="primary"
              data-testid="week-header"
            >
              {format(selectedDay, 'MMMM, yyyy', { locale })}
            </Typography>
          )}
        />
      </PickersProvider>

      <div style={style1}>
        <Button className={classes.cssButtonWeekChange} onClick={previousWeek}>
          <KeyboardArrowLeft />
        </Button>
        <BottomNavigation
          value={formatISO(selectedDay, { representation: 'date' })}
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
                    {daysOfTheWeek[getDay(day)]}
                  </Typography>
                  <Typography
                    className={classes.weekDayValue}
                    color="textSecondary"
                    variant="body1"
                  >
                    {format(day, 'dd')}
                  </Typography>
                </div>
              }
              value={formatISO(day, { representation: 'date' })}
            />
          ))}
        </BottomNavigation>
        <Button className={classes.cssButtonWeekChange} onClick={nextWeek}>
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
  locale = ptBR,
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
