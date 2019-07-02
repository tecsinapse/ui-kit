import { components } from 'react-select';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import React from 'react';

export const DropdownIndicator = props =>
  components.DropdownIndicator && (
    <components.DropdownIndicator
      {...props}
      className={props.selectProps.childrenClasses.dropdownIndicator}
    >
      <ArrowDropDown />
    </components.DropdownIndicator>
  );
