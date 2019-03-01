import React from 'react';
import { components } from 'react-select';
import Chip from '@material-ui/core/Chip';

export function ValueContainer({ selectProps, children, getValue, ...props }) {
  const { length } = getValue();

  if (selectProps.isMulti) {
    const childList = children && children[0];
    const itensMaxLenght = 1;
    const childrensToPrint =
      childList instanceof Array && childList.slice
        ? childList.slice(0, itensMaxLenght)
        : childList && childList[0];

    const restSize = length - itensMaxLenght;

    if (length === 0) {
      return (
        <components.ValueContainer
          {...props}
          className={selectProps.childrenClasses.multiValueContainer}
        >
          {children}
        </components.ValueContainer>
      );
    }
    return (
      <components.ValueContainer
        {...props}
        className={selectProps.childrenClasses.multiValueContainer}
      >
        {childrensToPrint}
        {restSize > 0 && <Chip label={`+${restSize}`} />}
        {React.cloneElement(children[1])}
      </components.ValueContainer>
    );
  }

  return (
    <div className={selectProps.childrenClasses.valueContainer}>
      <div className={selectProps.childrenClasses.input}>{children}</div>
    </div>
  );
}
