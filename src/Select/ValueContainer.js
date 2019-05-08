import React from 'react';
import { components } from 'react-select';
import Chip from '@material-ui/core/Chip';
import { SizeMe } from 'react-sizeme';

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
    return (
      <SizeMe>
        {({ size }) => {
          let free = size.width;

          // When it hasn't render yet, it can't stimate the container width,
          // so it suppose all space (initial state only). After statimating it,
          // it will save on state variable and always use it as total space
          if (isNaN(free) || free === 0) free = window.innerWidth;
          else if (selectProps.containerSize === 0)
            selectProps.setContainerSize(free);
          else free = selectProps.containerSize;

          const childList = children && children[0];
          const itensMaxLenght =
            childList instanceof Array && childList.reduce
              ? childList.reduce((current, child) => {
                  let newUsed = current;

                  // it doest exist it means that should render first to stimate its space
                  if (
                    !selectProps.optionSize ||
                    isNaN(selectProps.optionSize[child.props.children]) ||
                    selectProps.optionSize[child.props.children] === 0
                  ) {
                    newUsed += 1;
                  } else if (
                    selectProps.optionSize[child.props.children] <= free
                  ) {
                    free -= selectProps.optionSize[child.props.children];
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
        }}
      </SizeMe>
    );
  }

  return (
    <div className={selectProps.childrenClasses.valueContainer}>
      <div className={selectProps.childrenClasses.input}>{children}</div>
    </div>
  );
}
