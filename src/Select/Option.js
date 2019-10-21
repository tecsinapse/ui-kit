import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

export function Option({
  innerRef,
  isFocused,
  innerProps,
  children,
  data,
  isSelected,
  selectProps,
}) {
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={!selectProps.isMulti && isSelected}
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
      {selectProps.isMulti && (
        <Checkbox checked={isSelected} value="checkedA" />
      )}
      <body1
        style={{
          width: '100%',
          whiteSpace: 'normal',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {children}
      </body1>
    </MenuItem>
  );
}
