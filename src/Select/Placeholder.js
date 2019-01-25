import { Typography } from '@material-ui/core';
import React from 'react';

export const Placeholder = ({ selectProps, innerProps }) => (
  <Typography
    color={
      selectProps.meta.error && selectProps.meta.touched ? 'error' : 'primary'
    }
    variant="subtitle1"
    component="p"
    style={{
      ...(selectProps.isDisabled ? { color: 'rgb(180, 180, 180)' } : {}),
    }}
    className={selectProps.childrenClasses.placeholder}
  >
    Selecione...
  </Typography>
);
