import { makeStyles } from '@material-ui/styles';
import { defaultRed } from '../colors';

export const useGroupedInputStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1.2),
  },
  flexWithMarginLeft: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: theme.spacing(2 / 3),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1.2),
  },
  inputContainer: {
    display: 'flex',
  },
  inputFullWidth: {
    flexGrow: 1,
    display: 'flex',
  },
  marginLeft: {
    marginLeft: theme.spacing(1),
  },
  buttonIcon: {
    color: theme.palette.primary.contrastText,
  },
  paddingCropped: {
    padding: theme.spacing(1 / 4),
  },
  input: {
    flexGrow: 1,
    marginTop: 0,
    marginLeft: theme.spacing(2 / 3),
    marginRight: theme.spacing(2 / 3),
    marginBottom: theme.spacing(1.2),
  },
  flexPadding: {
    padding: theme.spacing(0.5),
  },
  empty: {
    marginBottom: theme.spacing(0.5),
  },
  errorLabel: {
    color: defaultRed,
  },
}));
