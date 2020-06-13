import React, { useRef } from 'react';
import { Controlnput } from './Controlnput';

const style1 = {
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  overflow: 'hidden',
};

export function Control({ selectProps, innerProps, innerRef, children }) {
  const inputRef = useRef();

  const onTouch = () => {
    inputRef.current.focus();
    selectProps.setMenuIsOpen(true);
  };

  const style = {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    minWidth: selectProps.minWidth,
  };

  return (
    // eslint-disable-next-line
    <div
      ref={innerRef}
      {...innerProps}
      style={style}
      onTouchEnd={onTouch}
      onClick={onTouch}
    >
      <Controlnput
        selectProps={selectProps}
        innerRef={innerRef}
        innerProps={innerProps}
      >
        <div style={style1} ref={inputRef}>
          {children}
        </div>
      </Controlnput>
    </div>
  );
}
