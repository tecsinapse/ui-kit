import React from 'react';
import { components } from 'react-select';

const style = { minWidth: '50px' };

export const SelectContainer = ({ children, selectProps, ...props }) => (
  <div
    name={selectProps.name}
    tabIndex={Math.floor(Math.random() * 80)}
    style={style}
  >
    <components.SelectContainer {...props}>
      {children}
    </components.SelectContainer>
  </div>
);
