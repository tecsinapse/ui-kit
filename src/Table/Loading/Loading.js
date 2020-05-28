import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';

export const styles = makeStyles(theme => ({
  loadingPanel: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: '100%',
    height: '100%',
    zIndex: '9999',
  },
  progress: {
    top: '43%',
    left: '47%',
    position: 'absolute',
  },
}));

const Loading = ({ loading }) => {
  const classes = styles();
  if (!loading) {
    return null;
  }

  return (
    <div className={classes.loadingPanel}>
      <CircularProgress className={classes.progress} />
    </div>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loading;
