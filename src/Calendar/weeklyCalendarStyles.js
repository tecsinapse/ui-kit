import { makeStyles } from '@material-ui/styles';

import { defaultGreyLight200 } from '@tecsinapse/ui-kit/build/colors';

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

export const weeklyCalendarStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    padding: spacing(1, 2, 1 / 3, 1.34),
    justifyContent: 'center',
  },
  selected: {
    '& $cssButtonNavigationWrp': {
      backgroundColor: palette.secondary.main,
    },
    '& $weekDayLabel, & $weekDayValue': {
      color: palette.secondary.contrastText,
    },
  },
  cssButtonNavigation: {
    width: '100%',
  },
  cssButtonNavigationAct: {
    minWidth: '24px !important',
    padding: '0px !important',
  },
  cssButtonWeekChange: {
    minWidth: '16px !important',
    padding: '0px !important',
  },
  cssButtonNavigationWrp: {
    border: 1,
    borderColor: defaultGreyLight200,
    borderStyle: 'solid',
    borderRadius: 8,
    margin: spacing(1 / 4),
    padding: spacing(1 / 6),
    paddingLeft: spacing(1 / 2),
    paddingRight: spacing(1 / 2),
  },
  weekDayLabel: {
    textTransform: 'uppercase',
    lineHeight: '1.3 !important',
    fontSize: '0.65rem !important',
  },
  weekDayValue: {
    lineHeight: '1.4 !important',
  },
}));
