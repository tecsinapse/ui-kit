import React from 'react';
import {components} from "react-select";

export const IndicatorsContainer = ({ selectProps, children, ...props }) => (
  <components.IndicatorsContainer
    {...props}
    className={selectProps.childrenClasses.dropdownIndicator}
  >
    {children}
  </components.IndicatorsContainer>
);
