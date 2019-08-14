import React from 'react';
import { Controlnput } from './Controlnput';

export function ControlWeb({ selectProps, innerRef, innerProps, children }) {
  const onTouch = () => {
    selectProps.setMenuIsOpen(!selectProps.menuIsOpen);
  };

  return (
    <div // eslint-disable-line jsx-a11y/click-events-have-key-events
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
