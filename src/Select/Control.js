import React, { useRef } from 'react';
import { Typography } from '@material-ui/core';

export function Control({ selectProps, innerProps, innerRef, children }) {
  const inputRef = useRef();

  return (
    // eslint-disable-next-line
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
      onTouchEnd={() => {}}
      onClick={() => {
        inputRef.current.focus();
        selectProps.setMenuIsOpen(true);
      }}
    >
      <Typography
        variant="caption"
        color={
          selectProps.meta.error && selectProps.meta.touched
            ? 'error'
            : 'primary'
        }
      >
        {selectProps.label}
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'row' }} ref={inputRef}>
        {children}
      </div>
    </div>
  );
}
