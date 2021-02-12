import React from 'react';
import {
  Switch as SwitchMaterialUi,
  Grid,
  Typography,
} from '@material-ui/core';

export const Switch = ({ label1, label2, on, off, size, color }) => {
  // eslint-disable-next-line no-shadow
  const handleCheck = (e, on, off) => {
    const { checked } = e.target;

    // eslint-disable-next-line mdx/no-unused-expressions
    checked ? on() : off();
  };

  return (
    <>
      <Grid>
        <Typography>{label1}</Typography>
      </Grid>
      <SwitchMaterialUi
        onChange={e => {
          handleCheck(e, on, off);
        }}
        size={size}
        color={color}
      />
      <Grid>
        <Typography>{label2}</Typography>
      </Grid>
    </>
  );
};
export default Switch;
