import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Brazil from './Flags/brazil.svg';
import Spain from './Flags/spain.svg';
import UnitedStates from './Flags/united-states.svg';

const components = {
  spain: Spain,
  brazil: Brazil,
  'united-states': UnitedStates,
};
const useStyles = ({ width }) =>
  makeStyles({
    svg: {
      width,
    },
  });

export const Flag = ({ variant = 'Brazil', width = 20 }) => {
  const classes = useStyles({ width })();
  const Component = components[variant];

  return <Component className={classes.svg} />;
};

Flag.defaultProps = {
  width: 20,
};
Flag.propTypes = {
  variant: PropTypes.oneOf(['brazil', 'spain', 'united-states']).isRequired,
  width: PropTypes.number,
};
