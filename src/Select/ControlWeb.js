import React from 'react';
import { Controlnput } from './Controlnput';

export function ControlWeb({ selectProps, innerRef, innerProps, children }) {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      <Controlnput
        selectProps={selectProps}
        innerRef={innerRef}
        innerProps={innerProps}
      >
        {children}
      </Controlnput>
    </div>
  );
}
