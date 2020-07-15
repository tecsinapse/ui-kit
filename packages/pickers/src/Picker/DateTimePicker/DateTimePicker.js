import React, { useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  DateTimePicker as DateTimePickerExt,
  KeyboardDateTimePicker,
  MuiPickersContext,
} from '@material-ui/pickers';
import { isNotUndefOrNull } from '@tecsinapse/es-utils';
import {
  Input,
  LocaleContext,
  customDatePickerStyle,
  renderStyledColor,
  renderStyledLabel,
} from '@tecsinapse/ui-kit';

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
    position: 'absolute',
    marginTop: '30%',
  },
  badgeNonCurrentMonth: {
    backgroundColor: theme.palette.text.disabled,
  },
}));

export const DateTimePicker = ({
  selectedDateTime,
  id,
  label,
  onChange,
  format = 'dd/MM/yyyy HH:mm',
  keyboardPicker,
  inputVariant,
  pointedDates,
  ...props
}) => {
  const utils = useContext(MuiPickersContext);
  const theme = useTheme();
  const styleProps = customDatePickerStyle(theme.variant);
  const classes = useStyle(styleProps);
  const {
    Picker: { todayLabel, okLabel, cancelLabel, clearLabel },
  } = useContext(LocaleContext);

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
          <span>
            <Typography variant="body2" color="inherit">
              {utils.getDayText(date)}{' '}
            </Typography>
          </span>
          {isPointed && (
            <Badge
              color={renderStyledColor(theme.variant)}
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
    <KeyboardDateTimePicker
      format={format}
      id={id}
      label={label}
      cancelLabel={renderStyledLabel(cancelLabel, theme.variant)}
      okLabel={renderStyledLabel(okLabel, theme.variant)}
      value={selectedDateTime}
      onChange={onChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
      renderDay={renderPointedDay}
      inputVariant={inputVariant}
      todayLabel={todayLabel}
      clearLabel={clearLabel}
      TextFieldComponent={Input}
      {...props}
    />
  ) : (
    <DateTimePickerExt
      format={format}
      id={id}
      label={label}
      cancelLabel={renderStyledLabel(cancelLabel, theme.variant)}
      okLabel={renderStyledLabel(okLabel, theme.variant)}
      value={selectedDateTime}
      onChange={onChange}
      renderDay={renderPointedDay}
      inputVariant={inputVariant}
      todayLabel={todayLabel}
      clearLabel={clearLabel}
      TextFieldComponent={Input}
      {...props}
    />
  );
};

DateTimePicker.defaultProps = {
  label: 'Date Picker',
  id: 'datepicker-id',
  onChange: () => {},
  format: undefined,
  keyboardPicker: false,
  pointedDates: [],
  inputVariant: 'outlined',
  selectedDateTime: undefined,
};

DateTimePicker.propTypes = {
  /** Current selected date and time */
  selectedDateTime: PropTypes.object,
  /** Input id */
  id: PropTypes.string,
  /** Input label */
  label: PropTypes.string,
  /** Change event handler */
  onChange: PropTypes.func,
  /** Date and time format to be rendered */
  format: PropTypes.string,
  /** Use keyboard picker */
  keyboardPicker: PropTypes.bool,
  /** Dates pointed on calendar */
  pointedDates: PropTypes.array,
  /** Input variant selector */
  inputVariant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};
export default DateTimePicker;
