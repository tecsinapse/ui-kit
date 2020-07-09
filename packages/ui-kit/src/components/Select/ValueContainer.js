import React from 'react';
import { components } from 'react-select';
import { MultiValue } from './MultiValue';

export function ValueContainer({ selectProps, children, getValue, ...props }) {
  const { length } = getValue();

  if (selectProps.isMulti) {
    let free = selectProps.selectSize ? selectProps.selectSize.width : 0;

    // When it hasn't render yet, it can't stimate the container width,
    // so it suppose no space.
    if (isNaN(free) || free === 0) {
      free = 0;
    } else if (selectProps.containerSize === 0) {
      selectProps.setContainerSize(free);
    } else {
      free = selectProps.containerSize;
    }

    // discount (+1) chip from free space and margin
    free -= 60;
    // discount right controllers from free space
    free -= 100;
    const childList = children && children[0];
    const itensMaxLenght =
      selectProps.itensMaxLenght ||
      (childList instanceof Array && childList.reduce
        ? childList.reduce((current, child) => {
            let newUsed = current;

            if (selectProps.valuesWidth[child.props.children] <= free) {
              // discount of left and right margin
              free -= 12;
              free -= selectProps.valuesWidth[child.props.children];
              newUsed += 1;
            }

            return newUsed;
          }, 0)
        : 0);

    const childrensToPrint =
      childList instanceof Array && childList.slice
        ? childList.slice(0, itensMaxLenght)
        : childList;

    const restSize = length - itensMaxLenght;

    return (
      <components.ValueContainer
        {...props}
        className={selectProps.childrenClasses.multiValueContainer}
      >
        {childrensToPrint}
        {restSize > 0 && (
          <MultiValue selectProps={selectProps}>{`+${restSize}`}</MultiValue>
        )}
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
