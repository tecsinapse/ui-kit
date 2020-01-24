import { emphasize } from '@material-ui/core/styles/colorManipulator';

export const selectInputStyle = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
  },
  multiValueContainer: {
    paddingLeft: '0px !important',
  },
  inputMultilineDense: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    height: '40px',
  },
  inputNormal: {
    display: 'flex',
    paddingTop: `${theme.spacing(0.5)}px !important`,
    paddingBottom: `${theme.spacing(0.5)}px !important`,
  },
  dummyWrapper: {
    display: 'none',
  },
  valueContainer: {
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flexGrow: 1,
  },
  chip: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    width: '100%',
  },
  divider: {
    height: theme.spacing(2),
  },
  select: {
    // nothing here
  },
  flex: {
    display: 'flex',
  },
  dropdownIndicator: {
    cursor: 'pointer !important',
  },
  separatorIndicatorMobile: {
    margin: 0,
  },
  body1Option: {
    width: '100%',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
});
