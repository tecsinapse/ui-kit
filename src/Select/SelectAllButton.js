import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';

export const SelectAllButton = ({ selectAll, allSelected }) => (
  <MenuItem
    style={{
      fontWeight: 500,
    }}
    component="div"
    onClick={selectAll}
  >
    <Checkbox checked={allSelected} value="checkedA" />
    Selecionar todos
  </MenuItem>
);
