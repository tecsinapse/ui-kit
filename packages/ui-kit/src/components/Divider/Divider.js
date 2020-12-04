import React from 'react';

import MuiDivider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { defaultGreyDisabled } from 'utils/colors';

const noBackground = { backgroundColor: 'unset' };
const useStyles = makeStyles({
  dashed: { borderTop: `dashed 1px ${defaultGreyDisabled}`, ...noBackground },
  solid: { borderTop: `solid 1px ${defaultGreyDisabled}`, ...noBackground },
});

export const Divider = ({ variant = 'dashed' }) => {
  const classes = useStyles();

  return (
    <MuiDivider
      classes={{
        root: classes[variant], // class name, e.g. `classes-nesting-root-x`
      }}
    />
  );
};
Divider.defaultProps = {
  variant: 'dashed',
};
Divider.propTypes = {
  variant: PropTypes.oneOf(['dashed', 'solid']),
};
