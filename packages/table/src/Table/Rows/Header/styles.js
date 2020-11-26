import { makeStyles } from '@material-ui/styles';

export const headerStyles = makeStyles(theme => ({
  selectionColumn: {
    maxWidth: '7%',
  },
  ascending: {
    paddingTop: 0,
    paddingRight: theme.spacing(1 / 5),
    paddingBottom: theme.spacing(1 / 3),
    paddingLeft: theme.spacing(1 / 5),
    marginLeft: 'auto',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  descending: {
    paddingTop: theme.spacing(1 / 3),
    paddingRight: theme.spacing(1 / 5),
    paddingBottom: 0,
    paddingLeft: theme.spacing(1 / 5),
    transform: 'rotate(180deg)',
  },
}));

export const sortStyles = makeStyles(() => ({
  sortedHover: {
    transition: 'opacity 0.25s',
    opacity: ({ sortedActive }) => (!sortedActive ? 1 : 100),
    '&:hover': {
      opacity: 100,
    },
  },
}));
