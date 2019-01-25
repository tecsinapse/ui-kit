import React from 'react';

export const IndicatorsContainer = ({ selectProps, children }) => (
  <div className={selectProps.childrenClasses.dropdown}>{children}</div>
);
