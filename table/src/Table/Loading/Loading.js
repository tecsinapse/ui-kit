import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loadingStyles } from './loadingStyles';

const Loading = ({ loading }) => {
  const classes = loadingStyles();
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

export { Loading };
export default Loading;
