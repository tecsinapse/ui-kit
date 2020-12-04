import React from 'react';
import { Typography } from '@material-ui/core';

export const SingleValue = ({ selectProps, innerProps, children }) => {
  const style = {
    width: '100%',
    ...(selectProps.isDisabled ? { color: 'rgb(180, 180, 180)' } : {}),
  };

  return (
    <Typography
      variant="subtitle1"
      component="p"
      color="textSecondary"
      style={style}
      className={selectProps.childrenClasses.placeholder}
    >
      {children}
    </Typography>
  );
};
