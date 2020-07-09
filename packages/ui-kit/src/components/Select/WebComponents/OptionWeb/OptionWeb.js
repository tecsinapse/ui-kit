import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export function OptionWeb({
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
      selected={isFocused}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
      disabled={data.disabled || false}
      {...innerProps}
    >
      {selectProps.isMulti && (
        <Checkbox checked={isSelected} value="checkedA" />
      )}
      <div className={selectProps.childrenClasses.body1Option}>{children}</div>
    </MenuItem>
  );
}
