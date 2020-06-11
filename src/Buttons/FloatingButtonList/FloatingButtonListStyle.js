import { makeStyles } from '@material-ui/core';

export const useFloatingButtonListStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    right: 15,
    bottom: 15,
    textAlign: 'center',
  },
  tooltip: {
    position: 'absolute',
    right: '50px',
    top: '50%',
    backgroundColor: '#6E6E6E',
    color: '#FFFFFF',
    opacity: 0.7,
    borderRadius: '4px',
    animation: 'fadein 600ms',
    transform: 'translate(0,-50%)',
    margin: `0 ${theme.spacing(3)}px`,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    padding: '3px 6px',
    width: 'auto',
  },
  fabItem: {
    position: 'relative',
    margin: 8,
  },
  '@keyframes fadein': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 0.7,
    },
  },
}));
