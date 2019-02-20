import { makeStyles } from '@material-ui/styles';

export const tableStyles = makeStyles(theme => ({
  table: {
    width: '100%',
  },
  searchBar: {
    flexGrow: '1',
    paddingRight: 0,
    boxShadow: 'none !important',
    width: '100%',
  },
}));
