import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  DatePicker as DatePickerExt,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { isNullOrUndefined } from 'rollup-plugin-node-builtins/src/es6/util';
import Interval from 'luxon/src/interval';
import { Input } from '../Inputs/Input';
import { LocaleContext } from '../LocaleProvider';
import { useStylesWeek } from './customWeekPickerStyles';

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

function useCustomInput(CustomTextFieldComponentInput) {
  const [open, setOpen] = useState(false);

  if (isNullOrUndefined(CustomTextFieldComponentInput)) {
    return {
      customTextFieldComponent: null,
    };
  }

  const onOpen = () => setOpen(true);

  const customTextFieldComponent = () => (
    <div onClick={onOpen} onKeyDown={() => {}}>
      <CustomTextFieldComponentInput />
    </div>
  );

  return {
    open,
    onOpen,
    onClose: () => setOpen(false),
    customTextFieldComponent,
  };
}

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
  customTextFieldComponentInput = null,
  weekly,
  ...props
}) => {
  const classesWeek = useStylesWeek();
  const classes = useStyle();
  const {
    Picker: { todayLabel, okLabel, cancelLabel, clearLabel },
  } = useContext(LocaleContext);

  const {
    customTextFieldComponent,
    ...customTextFieldComponentInputProps
  } = useCustomInput(customTextFieldComponentInput);

  const renderWrappedWeekDay = classes2 => (
    date,
    selectedDateRender,
    dayInCurrentMonth
  ) => {
    const dateClone = date;
    const selectedDateClone = selectedDateRender;

    const start = selectedDateClone.startOf('week');
    const end = selectedDateClone.endOf('week');

    const dayIsBetween = Interval.fromDateTimes(start, end).contains(dateClone);

    const isFirstDay = start.hasSame(dateClone, 'day');
    const isLastDay = end.hasSame(dateClone, 'day');

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
          <span> {dateClone.toFormat('d')} </span>
        </IconButton>
      </div>
    );
  };

  const renderPointedDay = (date, selectedDateRender, dayInCurrentMonth) => {
    const isPointed =
      pointedDates.find(pointDate => pointDate.hasSame(date, 'day')) !==
      undefined;
    const isSelected = date.hasSame(selectedDateRender, 'day');

    const dayClassName = classNames(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlight]: isSelected,
    });

    return (
      <div role="presentation">
        <IconButton className={dayClassName}>
          <span>
            <Typography variant="body2" color="inherit">
              {date.toFormat('d')}{' '}
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
      TextFieldComponent={customTextFieldComponent || Input}
      {...props}
      {...customTextFieldComponentInputProps}
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
      TextFieldComponent={customTextFieldComponent || Input}
      {...props}
      {...customTextFieldComponentInputProps}
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
