import React from 'react';
import { components } from 'react-select';
import Chip from '@material-ui/core/Chip';

export function ValueContainer({ selectProps, children, getValue, ...props }) {
  const { length } = getValue();

  if (selectProps.isMulti) {
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
    let free = selectProps.selectSize ? selectProps.selectSize.width : 0;

    // When it hasn't render yet, it can't stimate the container width,
    // so it suppose all space (initial state only). After statimating it,
    // it will save on state variable and always use it as total space
    if (isNaN(free) || free === 0) free = window.innerWidth;
    else if (selectProps.containerSize === 0)
      selectProps.setContainerSize(free);
    else free = selectProps.containerSize;

    // discount (+1) chip from free space and margin
    free -= 40;
    // discount right controllers from free space
    free -= 85;
    const childList = children && children[0];
    const itensMaxLenght =
      childList instanceof Array && childList.reduce
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
        : 0;

    const childrensToPrint =
      childList instanceof Array && childList.slice
        ? childList.slice(0, itensMaxLenght)
        : childList && childList[0];

    const restSize = length - itensMaxLenght;

    return (
      <components.ValueContainer
        {...props}
        className={selectProps.childrenClasses.multiValueContainer}
      >
        {childrensToPrint}
        {restSize > 0 && (
          <Chip
            className={selectProps.childrenClasses.chip}
            label={`+${restSize}`}
          />
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
