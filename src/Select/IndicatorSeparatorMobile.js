import { components } from 'react-select';
import React from 'react';

export const IndicatorSeparatorMobile = props =>
  components.IndicatorSeparator && (
    <components.IndicatorSeparator
      {...props}
      className={props.selectProps.childrenClasses.separatorIndicatorMobile}
    />
  );
