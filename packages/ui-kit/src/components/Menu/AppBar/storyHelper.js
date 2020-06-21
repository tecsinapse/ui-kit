import { makeStyles, styled } from '@material-ui/styles';
import { AppBar } from './AppBar';

export const StyledAppBar = styled(AppBar)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
});

export const appBarStyles = makeStyles(() => ({
  div: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    display: 'flex',
  },
  flex: {
    alignItems: 'center',
    display: 'flex',
    padding: '12px',
  },
  image: {
    maxWidth: '72px',
    marginRight: '24px',
  },
}));
