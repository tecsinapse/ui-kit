import React from 'react';
import { Typography } from '@material-ui/core';

export function NoOptionsMessage({ selectProps, innerProps }) {
  return (
    <Typography
      color="textSecondary"
      className={selectProps.childrenClasses.noOptionsMessage}
      {...innerProps}
    >
      {selectProps.selectPromptMessage}...
    </Typography>
  );
}
