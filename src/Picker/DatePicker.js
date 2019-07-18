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
  KeyboardDatePicker,
  DatePicker as DatePickerExt,
} from '@material-ui/pickers';
import { Input } from '../Inputs/Input';
import { LocaleContext } from '../LocaleProvider';

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
  pointedDates,
  ...props
}) => {
  const classes = useStyle();
  const {
    Picker: { todayLabel, okLabel, cancelLabel, clearLabel },
  } = useContext(LocaleContext);

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
      renderDay={renderPointedDay}
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
      renderDay={renderPointedDay}
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
