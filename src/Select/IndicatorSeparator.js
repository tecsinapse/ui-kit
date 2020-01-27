import { components } from 'react-select';
import React from 'react';

export const IndicatorSeparator = props =>
  components.IndicatorSeparator && (
    <components.IndicatorSeparator
      {...props}
      className={props.selectProps.childrenClasses.separatorIndicator}
    />
  );
