import React from 'react';

export function ValueContainer({ selectProps, children }) {
  return (
    <div className={selectProps.childrenClasses.valueContainer}>
      <span>{children}</span>
    </div>
  );
}
