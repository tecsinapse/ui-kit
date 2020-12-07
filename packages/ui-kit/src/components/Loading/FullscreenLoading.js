import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const styles = {
  '@keyframes spin': {
    from: {
      W: 'rotate(0deg)',
      transform: 'rotate(0deg)',
    },
    to: {
      W: 'rotate(360deg)',
      transform: 'rotate(360deg)',
    },
  },
  coverspin: {
    position: 'fixed',
    width: '100%',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: '9999',
    '&:after': {
      content: "''",
      display: 'block',
      position: 'absolute',
      left: '48%',
      top: '40%',
      width: 40,
      height: 40,
      borderStyle: 'solid',
      borderColor: 'black',
      borderTopColor: 'transparent',
      borderWidth: 4,
      borderRadius: '50%',
      WebkitAnimation: '$spin .8s linear infinite',
      animation: '$spin .8s linear infinite',
    },
  },
};

export const FullScreenLoading = withStyles(styles)(({ classes, show }) => (
  <div>{show && <div className={classes.coverspin} />}</div>
));

FullScreenLoading.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default FullScreenLoading;
