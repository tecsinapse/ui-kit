import React from 'react';
import { components } from 'react-select';

export function ValueContainer({ selectProps, children, getValue, ...props }) {
  const { length } = getValue();

  if (selectProps.isMulti) {
    return (
      <components.ValueContainer {...props}>
        {!selectProps.menuIsOpen &&
          `${length} Item${length !== 1 ? 's' : ''} selecionados`}
        {React.cloneElement(children[1])}
      </components.ValueContainer>
    );
  }

  return (
    <div className={selectProps.childrenClasses.valueContainer}>
      <div>{children}</div>
    </div>
  );
}
