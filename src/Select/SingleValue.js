import { Typography } from '@material-ui/core';
import React from 'react';

export const SingleValue = ({ selectProps, innerProps, children }) => (
  <Typography
    variant="subtitle1"
    component="p"
    color="textSecondary"
    style={{
      ...(selectProps.isDisabled ? { color: 'rgb(180, 180, 180)' } : {}),
    }}
    className={selectProps.childrenClasses.placeholder}
  >
    {children}
  </Typography>
);
