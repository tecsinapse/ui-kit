import { emphasize } from '@material-ui/core/styles/colorManipulator';

export const selectInputStyle = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
  },
  inputMultiline: {
    paddingTop: `${theme.spacing.unit / 4}px !important`,
    paddingBottom: `${theme.spacing.unit / 4}px !important`,
  },
  inputMultilineDense: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
  },
  inputNormal: {
    display: 'flex',
    paddingTop: `${theme.spacing.unit / 2}px !important`,
    paddingBottom: `${theme.spacing.unit / 2}px !important`,
  },
  dummyWrapper: {
    display: 'none',
  },
  valueContainer: {
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
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
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
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
    height: theme.spacing.unit * 2,
  },
  select: {
    // paddingTop: theme.spacing.unit / 2,
  },
  flex: {
    display: 'flex',
  },
  dropdownIndicator: {
    cursor: 'pointer !important',
  },
});
