import React, { useContext, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  DatePicker as DatePickerExt,
  KeyboardDatePicker,
  MuiPickersContext,
} from '@material-ui/pickers';
import { endOfWeek, startOfWeek } from 'date-fns';

import { isNotUndefOrNull } from '@tecsinapse/es-utils/build';
import {
  Input,
  LocaleContext,
  customDatePickerStyle,
  renderStyledColor,
  renderStyledLabel,
} from '@tecsinapse/ui-kit';

import { useStylesWeek } from './styles';

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
    background: ({ highligthBgColor }) =>
      isNotUndefOrNull(highligthBgColor)
        ? highligthBgColor
        : theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      backgroundColor: ({ highligthBgColor }) =>
        isNotUndefOrNull(highligthBgColor)
          ? highligthBgColor
          : theme.palette.primary.main,
    },
  },
  badge: {
    top: '105%',
    right: '50%',
  },
  badgeNonCurrentMonth: {
    backgroundColor: theme.palette.text.disabled,
  },
}));

function useCustomInput(CustomTextFieldComponentInput) {
  const [open, setOpen] = useState(false);

  if (!isNotUndefOrNull(CustomTextFieldComponentInput)) {
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
  const utils = useContext(MuiPickersContext);
  const classesWeek = useStylesWeek();
  const theme = useTheme();
  const styleProps = customDatePickerStyle(theme.variant);
  const classes = useStyle(styleProps);
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
    const start = startOfWeek(selectedDateRender);
    const end = endOfWeek(selectedDateRender);

    const dayIsBetween =
      utils.isAfterDay(date, start) && utils.isBeforeDay(date, end);
    const isFirstDay = utils.isSameDay(start, date);
    const isLastDay = utils.isSameDay(end, date);

    const wrapperClassName = clsx({
      [classes2.highlight]: dayIsBetween,
      [classes2.firstHighlight]: isFirstDay,
      [classes2.endHighlight]: isLastDay,
    });

    const dayClassName = clsx(classes2.day, {
      [classes2.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes2.highlightNonCurrentMonthDay]:
        !dayInCurrentMonth && dayIsBetween,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName} href="">
          <span> {utils.getDayText(date)} </span>
        </IconButton>
      </div>
    );
  };

  const renderPointedDay = (date, selectedDateRender, dayInCurrentMonth) => {
    const isPointed =
      pointedDates.find(pointDate => utils.isSameDay(pointDate, date)) !==
      undefined;
    const isSelected = utils.isSameDay(date, selectedDateRender);

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlight]: isSelected,
    });

    return (
      <div role="presentation">
        <IconButton className={dayClassName}>
          <Badge
            color={renderStyledColor(theme.variant)}
            variant="dot"
            classes={
              !dayInCurrentMonth
                ? {
                    colorPrimary: classes.badgeNonCurrentMonth,
                    badge: classes.badge,
                  }
                : { badge: classes.badge }
            }
            invisible={!isPointed}
          >
            <span>
              <Typography variant="body2" color="inherit">
                {utils.getDayText(date)}{' '}
              </Typography>
            </span>
          </Badge>
        </IconButton>
      </div>
    );
  };

  return keyboardPicker ? (
    <KeyboardDatePicker
      format={format}
      id={id}
      label={label}
      cancelLabel={renderStyledLabel(cancelLabel, theme.variant)}
      okLabel={renderStyledLabel(okLabel, theme.variant)}
      value={selectedDate}
      onChange={onChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
      renderDay={weekly ? renderWrappedWeekDay(classesWeek) : renderPointedDay}
      inputVariant={inputVariant}
      todayLabel={todayLabel}
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
      cancelLabel={renderStyledLabel(cancelLabel, theme.variant)}
      okLabel={renderStyledLabel(okLabel, theme.variant)}
      value={selectedDate}
      onChange={onChange}
      renderDay={weekly ? renderWrappedWeekDay(classesWeek) : renderPointedDay}
      inputVariant={inputVariant}
      todayLabel={todayLabel}
      clearLabel={clearLabel}
      TextFieldComponent={customTextFieldComponent || Input}
      {...props}
      {...customTextFieldComponentInputProps}
    />
  );
};

DatePicker.defaultProps = {
  label: 'Date Picker',
  id: undefined,
  name: undefined,
  onChange: () => {},
  format: undefined,
  keyboardPicker: false,
  pointedDates: [],
  inputVariant: 'outlined',
  selectedDate: undefined,
  weekly: undefined,
  fullWidth: undefined,
  disabled: undefined,
};

DatePicker.propTypes = {
  /** Current selected date */
  selectedDate: PropTypes.object,
  /** Input id */
  id: PropTypes.string,
  /** Input name */
  name: PropTypes.string,
  /** Input label */
  label: PropTypes.string,
  /** Change event handler */
  onChange: PropTypes.func,
  /** Date format to be rendered */
  format: PropTypes.string,
  /** Use keyboard picker */
  keyboardPicker: PropTypes.bool,
  /** Dates to be pointed on calendar */
  pointedDates: PropTypes.array,
  /** Input variant style */
  inputVariant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
  /** Custom component render */
  customTextFieldComponentInput: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
  ]),
  /** Pick the entire week */
  weekly: PropTypes.bool,
  /** Fill div/screen width */
  fullWidth: PropTypes.bool,
  /** Disable Select */
  disabled: PropTypes.bool,
};
export default DatePicker;
