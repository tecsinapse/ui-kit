import React, { useRef } from 'react';
import { Controlnput } from './Controlnput';

export function ControlWeb({ selectProps, innerRef, innerProps, children }) {
  const onTouch = () => {
    selectProps.setMenuIsOpen(true);
  };

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
      onTouchEnd={onTouch}
      onClick={onTouch}
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
