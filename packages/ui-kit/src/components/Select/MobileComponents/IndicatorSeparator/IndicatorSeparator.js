import { components } from 'react-select';
import React from 'react';

export const IndicatorSeparator = props => {
  const { selectProps } = props;

  return (
    components.IndicatorSeparator && (
      <components.IndicatorSeparator
        {...props}
        className={selectProps.childrenClasses.separatorIndicator}
      />
    )
  );
};
