import React, { useRef } from 'react';
import { Controlnput } from './Controlnput';

export function Control({ selectProps, innerProps, innerRef, children }) {
  const inputRef = useRef();

  const onTouch = () => {
    inputRef.current.focus();
    selectProps.setMenuIsOpen(true);
  };

  return (
    // eslint-disable-next-line
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        minWidth: selectProps.minWidth,
      }}
      onTouchEnd={onTouch}
      onClick={onTouch}
    >
      <Controlnput
        selectProps={selectProps}
        innerRef={innerRef}
        innerProps={innerProps}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            overflow: 'hidden',
          }}
          ref={inputRef}
        >
          {children}
        </div>
      </Controlnput>
    </div>
  );
}
