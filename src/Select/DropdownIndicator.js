import { components } from 'react-select';
import React from 'react';

export const DropdownIndicator = ({
  innerProps: { onTouchEnd, ...innerPropsAux },
  ...props
}) =>
  components.DropdownIndicator && (
    <components.DropdownIndicator
      innerProps={innerPropsAux}
      {...props}
      className={props.selectProps.childrenClasses.dropdownIndicator}
    />
  );
