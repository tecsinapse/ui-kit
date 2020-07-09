import { makeStyles } from '@material-ui/styles';
import {
  defaultGreen,
  defaultOrange,
  defaultRed,
} from '@tecsinapse/ui-kit/build/utils/colors';

export const iconMargin = {
  margin: '0 6px 0 4px',
  display: 'flex',
  alignItems: 'center',
};
export const alertColor = { color: '#fff' };
export const useStyles = makeStyles(({ spacing, palette }) => ({
  margin: {
    margin: spacing(1),
  },
  completedStep: {
    color: `${defaultGreen} !important`,
  },
  disabledStep: {},
  errorStep: {
    color: `${defaultRed} !important`,
  },
  activeStep: {
    color: `${palette.secondary.main} !important`,
    textColor: palette.secondary.contrastText,
  },
  stepper: { backgroundColor: 'transparent' },
  wizard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  wizardContent: {
    flexGrow: 1,
    padding: spacing(1),
  },
  wizardFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing(1),
  },
  stepAlert: {
    margin: spacing(0, 1, 0, 1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing(1 / 2),
    borderRadius: '5px',
  },
  bgOrange: {
    backgroundColor: defaultOrange,
  },
  bgRed: {
    backgroundColor: defaultRed,
  },
  nextButton: {
    marginLeft: spacing(1 / 2),
    minWidth: '25%',
  },
  backButton: {
    marginRight: spacing(1 / 2),
    minWidth: '25%',
  },
}));
