import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch as SwitchMaterialUi,
  Grid,
  Typography,
} from '@material-ui/core';

export const Switch = ({ labels, onChange, size, color }) => (
  <>
    <Grid>
      <Typography>{labels.left}</Typography>
    </Grid>
    <SwitchMaterialUi
      onChange={e => {
        onChange(e);
      }}
      size={size}
      color={color}
    />
    <Grid>
      <Typography>{labels.right}</Typography>
    </Grid>
  </>
);
export default Switch;

const labelsShape = {
  left: PropTypes.string,
  rigth: PropTypes.string,
};

Switch.propTypes = {
  /** labels of object (left/right) */
  labels: PropTypes.shape(labelsShape),
  /** Switch size */
  size: PropTypes.string,
  /** color switch */
  color: PropTypes.string,
  /** function used when switch is on */
};
