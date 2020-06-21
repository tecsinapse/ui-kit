import { components } from 'react-select';
import React from 'react';

export const DropdownIndicator = ({
  innerProps: { onTouchEnd, ...innerPropsAux },
  ...props
}) => {
  const { selectProps } = props;

  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator
        innerProps={innerPropsAux}
        {...props}
        className={selectProps.childrenClasses.dropdownIndicator}
      />
    )
  );
};
