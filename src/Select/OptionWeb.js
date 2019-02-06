import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';

export function OptionWeb({
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
      selected={isFocused}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
      disabled={data.disabled || false}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
}
