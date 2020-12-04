import React from 'react';
import { Typography } from '@material-ui/core';

export const Placeholder = ({ selectProps, innerProps }) => (
  <Typography
    color={
      selectProps.meta.error && selectProps.meta.touched
        ? 'error'
        : 'textPrimary'
    }
    variant="subtitle1"
    component="p"
    style={{
      ...(selectProps.isDisabled ? { color: 'rgb(180, 180, 180)' } : {}),
    }}
    className={selectProps.childrenClasses.placeholder}
  >
    {selectProps.selectPromptMessage}...
  </Typography>
);
