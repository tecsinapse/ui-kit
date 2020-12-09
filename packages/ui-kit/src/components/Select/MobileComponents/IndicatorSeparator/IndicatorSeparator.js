import React from 'react';
import { components } from 'react-select';

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
