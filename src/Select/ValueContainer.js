import React from 'react';
import { components } from 'react-select';
import Chip from '@material-ui/core/Chip';

export function ValueContainer({ selectProps, children, getValue, ...props }) {
  const { length } = getValue();

  if (selectProps.isMulti) {
    const childList = children[0];

    const childrensToPrint =
      childList instanceof Array && childList.slice
        ? childList.slice(0, 2)
        : childList[0];

    const restSize = length - 2;

    return (
      <components.ValueContainer {...props}>
        {childrensToPrint}
        {React.cloneElement(children[1])}
        {!selectProps.menuIsOpen && restSize > 0 && (
          <Chip label={`+${restSize}`} />
        )}
      </components.ValueContainer>
    );
  }

  return (
    <div className={selectProps.childrenClasses.valueContainer}>
      <div>{children}</div>
    </div>
  );
}
