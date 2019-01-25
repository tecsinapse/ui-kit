import { Typography } from '@material-ui/core';
import React from 'react';

export function NoOptionsMessage({ selectProps, innerProps }) {
  return (
    <Typography
      color="textSecondary"
      className={selectProps.childrenClasses.noOptionsMessage}
      {...innerProps}
    >
      Selecione...
    </Typography>
  );
}
