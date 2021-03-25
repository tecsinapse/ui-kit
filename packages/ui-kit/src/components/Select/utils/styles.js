import { emphasize } from '@material-ui/core/styles/colorManipulator';

const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));

  return `rgba(${r},${g},${b},${alpha})`;
};

export const styles = theme => ({
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

    // Material v4 inserts a fixed height to InputBase breaking the select web style
    // See: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/InputBase/InputBase.js#L81
    height: '1.75em',
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
  separatorIndicator: {
    margin: `0px !important`,
  },
  body1Option: {
    width: '100%',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  noZIndex: {
    zIndex: 'unset',
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '6px',
    },
    '*::-webkit-scrollbar-thumb': {
      borderRadius: '12px',
      backgroundColor: hex2rgba(theme.palette.primary.main, 0.5),
    },
    '*::-webkit-scrollbar-thumb:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
});
