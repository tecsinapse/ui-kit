import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import ButtonBase from '@material-ui/core/ButtonBase';
import { mdiChevronRight } from '@mdi/js';
import Icon from '@mdi/react';
import { defaultGreyLight2 } from 'utils/colors';

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
  textColor: {
    color: `${defaultGreyLight2} !important`,
  },
});

export const DivButton = ({ children, infoText, notifyNumber, ...props }) => {
  const classes = useStyle();

  return (
    <ButtonBase focusRipple className={classes.root} {...props}>
      {children}
      <div>
        <Badge
          badgeContent={notifyNumber}
          color="error"
          classes={{ badge: classes.badgeNotification }}
        >
          <Typography
            variant="h6"
            color="textPrimary"
            classes={{ colorTextPrimary: classes.textColor }}
          >
            {infoText}
          </Typography>
        </Badge>
      </div>
      <Icon path={mdiChevronRight} size={3 / 2} color={defaultGreyLight2} />
    </ButtonBase>
  );
};

DivButton.defaultProps = {
  infoText: '',
  notifyNumber: 0,
};

DivButton.propTypes = {
  /** Text to be displayed */
  infoText: PropTypes.string,
  /** Number of notifications */
  notifyNumber: PropTypes.number,
};

export default DivButton;
