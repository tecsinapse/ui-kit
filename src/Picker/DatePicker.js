import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import classNames from 'classnames';
import isSameDay from 'date-fns/isSameDay';
import formatDate from 'date-fns/format';
import PropTypes from 'prop-types';
import {
  DatePicker as DatePickerExt,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import endOfWeek from 'date-fns/endOfWeek';
import startOfWeek from 'date-fns/startOfWeek';
import isWithinInterval from 'date-fns/isWithinInterval';
import { Input } from '../Inputs/Input';
import { LocaleContext } from '../LocaleProvider';
import { useStylesWeek } from './customWeekPickerStyles';
import { makeJSDateObject } from './utils';

const useStyle = makeStyles(theme => ({
  dayWrapper: {
    position: 'relative',
  },
  day: {
    padding: 0,
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: '0 2px',
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
  },
  customDayHighlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '2px',
    right: '2px',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: '50%',
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled,
    pointerEvents: 'none',
  },
  highlightNonCurrentMonthDay: {
    color: '#676767',
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  badge: {
    position: 'absolute',
    marginTop: '30%',
  },
  badgeNonCurrentMonth: {
    backgroundColor: theme.palette.text.disabled,
  },
}));

export const DatePicker = ({
  selectedDate,
  id,
  label,
  onChange,
  format,
  keyboardPicker,
  inputVariant,
  // TODO: mudar pointedDates e weekly para variant
  pointedDates,
  weekly,
  ...props
}) => {
  const classesWeek = useStylesWeek();
  const classes = useStyle();
  const {
    Picker: { todayLabel, okLabel, cancelLabel, clearLabel },
  } = useContext(LocaleContext);

  const renderWrappedWeekDay = classes2 => (
    date,
    selectedDateRender,
    dayInCurrentMonth
  ) => {
    const dateClone = makeJSDateObject(date);
    const selectedDateClone = makeJSDateObject(selectedDateRender);

    const start = startOfWeek(selectedDateClone);
    const end = endOfWeek(selectedDateClone);

    const dayIsBetween = isWithinInterval(dateClone, { start, end });

    const isFirstDay = isSameDay(start, 'day');
    const isLastDay = isSameDay(end, 'day');

    const wrapperClassName = classNames({
      [classes2.highlight]: dayIsBetween,
      [classes2.firstHighlight]: isFirstDay,
      [classes2.endHighlight]: isLastDay,
    });

    const dayClassName = classNames(classes2.day, {
      [classes2.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes2.highlightNonCurrentMonthDay]:
        !dayInCurrentMonth && dayIsBetween,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName} href="">
          <span> {formatDate(dateClone, 'd')} </span>
        </IconButton>
      </div>
    );
  };

  const renderPointedDay = (date, selectedDateRender, dayInCurrentMonth) => {
    const isPointed =
      pointedDates.find(pointDate => isSameDay(pointDate, date)) !== undefined;
    const isSelected = isSameDay(date, selectedDateRender);

    const dayClassName = classNames(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlight]: isSelected,
    });

    return (
      <div role="presentation">
        <IconButton className={dayClassName}>
          <span>
            <Typography variant="body2" color="inherit">
              {formatDate(date, 'd')}{' '}
            </Typography>
          </span>
          {isPointed && (
            <Badge
              color="primary"
              className={classes.badge}
              variant="dot"
              classes={
                !dayInCurrentMonth
                  ? { colorPrimary: classes.badgeNonCurrentMonth }
                  : undefined
              }
            />
          )}
        </IconButton>
      </div>
    );
  };

  return keyboardPicker ? (
    <KeyboardDatePicker
      format={format}
      id={id}
      label={label}
      value={selectedDate}
      onChange={onChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
      renderDay={weekly ? renderWrappedWeekDay(classesWeek) : renderPointedDay}
      inputVariant={inputVariant}
      todayLabel={todayLabel}
      okLabel={okLabel}
      cancelLabel={cancelLabel}
      clearLabel={clearLabel}
      TextFieldComponent={Input}
      {...props}
    />
  ) : (
    <DatePickerExt
      format={format}
      id={id}
      label={label}
      value={selectedDate}
      onChange={onChange}
      renderDay={weekly ? renderWrappedWeekDay(classesWeek) : renderPointedDay}
      inputVariant={inputVariant}
      todayLabel={todayLabel}
      okLabel={okLabel}
      cancelLabel={cancelLabel}
      clearLabel={clearLabel}
      TextFieldComponent={Input}
      {...props}
    />
  );
};

DatePicker.defaultProps = {
  label: 'Date Picker',
  id: 'datepicker-id',
  onChange: () => {},
  format: undefined,
  keyboardPicker: false,
  pointedDates: [],
  inputVariant: 'outlined',
  selectedDate: undefined,
};

DatePicker.propTypes = {
  selectedDate: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  format: PropTypes.string,
  keyboardPicker: PropTypes.bool,
  pointedDates: PropTypes.arrayOf(Date),
  inputVariant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};
export default DatePicker;
