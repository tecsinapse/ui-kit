import React from 'react';

export function ValueContainer({ selectProps, children }) {
  return (
    <div className={selectProps.childrenClasses.valueContainer}>
      <div>{children}</div>
    </div>
  );
}
