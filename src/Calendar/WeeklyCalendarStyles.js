export const weeklyCalendarStyles = theme => ({
  root: {
    padding: '8px 16px 4px 16px',
    minWidth: 320,
    justifyContent: 'center',
  },
  cssDatepicker: {
    width: '100%',
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
    borderColor: theme.palette.primary.main,
    borderStyle: 'solid',
    borderRadius: 4,
    margin: 4,
    padding: 4,
  },
  weekDayLabel: {
    display: 'block',
  },
  dayLabel: {
    display: 'block',
  },
});
