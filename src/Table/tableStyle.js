import { makeStyles } from '@material-ui/styles';

export const tableStyles = makeStyles({
  table: {
    width: '100%',
  },
  searchBar: {
    flexGrow: '1',
    paddingRight: 0,
    boxShadow: 'none !important',
    width: '100%',
  },
  rootMobile: {
    height: size => size,
    flex: '1 1 auto',
    width: '100%',
    position: 'absolute',
  },
});
