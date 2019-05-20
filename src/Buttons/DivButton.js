import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Badge from '@material-ui/core/Badge';

const useStyle = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  badgeNotification: {
    top: '50%',
    right: -15,
  },
});

export const DivButton = ({ children, infoText, notifyNumber, onClick }) => {
  const classes = useStyle();

  return (
    <div onClick={onClick} onKeyPress={() => {}} className={classes.root}>
      {children}
      <div>
        <Badge
          badgeContent={notifyNumber}
          color="error"
          classes={{ badge: classes.badgeNotification }}
        >
          <Typography variant="h6" color="primary">
            {infoText}
          </Typography>
        </Badge>
      </div>
      <ArrowForwardIos />
    </div>
  );
};

DivButton.defaultProps = {
  infoText: '',
  notifyNumber: 0,
};

DivButton.propTypes = {
  infoText: PropTypes.string,
  notifyNumber: PropTypes.number,
};
export default DivButton;
