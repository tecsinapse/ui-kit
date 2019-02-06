import React from 'react';
import { components } from 'react-select';

export const SelectContainer = ({ children, selectProps, ...props }) => (
  <div name={selectProps.name} tabIndex={Math.floor(Math.random() * 80)} style={{minWidth:'50px'}}>
    <components.SelectContainer {...props}>
      {children}
    </components.SelectContainer>
  </div>
);
