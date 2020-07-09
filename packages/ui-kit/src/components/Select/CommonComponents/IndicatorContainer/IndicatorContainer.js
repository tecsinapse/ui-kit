import React from 'react';
import { components } from 'react-select';

export const IndicatorsContainer = ({ selectProps, children, ...props }) => (
  <components.IndicatorsContainer
    {...props}
    className={selectProps.childrenClasses.dropdownIndicator}
  >
    <div id="customIndicators">{selectProps.customIndicators}</div>
    {children}
  </components.IndicatorsContainer>
);
