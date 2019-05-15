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

const TableLoading = ({ loading }) => {
  if (!loading) return null;

  const classes = styles();

  return (
    <div className={classes.loadingPanel}>
      <CircularProgress className={classes.progress} />
    </div>
  );
};

TableLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default TableLoading;
