import { defaultGreyLight200 } from '../colors';

export const muiInlineDatePicker = {
  overrides: {
    MuiFormControl: {
      root: { width: '100%' },
    },
    MuiInput: {
      input: {
        textTransform: 'capitalize',
        textAlign: 'center',
      },
      underline: {
        '&:before, &:after': {
          borderBottomStyle: 'solid !important',
          borderBottomColor: `${defaultGreyLight200} !important`,
          borderBottomWidth: '1px !important',
        },
      },
    },
  },
};

export const weeklyCalendarStyles = theme => ({
  root: {
    padding: '8px 16px 4px 16px',
    minWidth: 320,
    justifyContent: 'center',
  },
  selected: {
    '& $cssButtonNavigationWrp': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
  },
  cssButtonNavigation: {
    width: '100%',
  },
  cssButtonNavigationAct: {
    minWidth: '24px !important',
    padding: '0px !important',
  },
  cssButtonNavigationWrp: {
    border: 1,
    borderColor: defaultGreyLight200,
    borderStyle: 'solid',
    borderRadius: '15%',
    margin: 4,
    padding: 2,
  },
  weekDayLabel: {
    display: 'block',
    fontSize: '7pt',
    textTransform: 'uppercase',
  },
  dayLabel: {
    display: 'block',
    fontSize: '12pt',
  },
});
