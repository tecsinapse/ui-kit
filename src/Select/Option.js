import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

export function Option({
  innerRef,
  isFocused,
  innerProps,
  children,
  data,
  isSelected,
}) {
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isSelected}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
        whiteSpace: 'normal',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }}
      disabled={data.disabled || false}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
}
