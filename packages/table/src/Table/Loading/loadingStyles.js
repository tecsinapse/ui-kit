import { makeStyles } from '@material-ui/styles';

export const loadingStyles = makeStyles(theme => ({
  loadingPanel: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: '100%',
    height: '100%',
  },
  progress: {
    margin: theme.spacing(1),
    top: '43%',
    left: '47%',
    zIndex: '9999',
    position: 'absolute',
  },
}));
