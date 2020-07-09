import React from 'react';
import { Controlnput } from '../../CommonComponents';

const style = {
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
};

export const ControlWeb = ({ selectProps, innerRef, innerProps, children }) => {
  const onTouch = e => {
    if (!document.getElementById('customIndicators').contains(e.target)) {
      selectProps.setMenuIsOpen(!selectProps.menuIsOpen);
    }
  };

  return (
    <div // eslint-disable-line jsx-a11y/click-events-have-key-events
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
        {children}
      </Controlnput>
    </div>
  );
};
