import { components } from 'react-select';

import React from 'react';

export function SingleValueWeb({ selectProps, innerProps, children, ...rest }) {
  return (
    <components.SingleValue selectProps={selectProps} {...rest}>
      {children}
    </components.SingleValue>
  );
}
