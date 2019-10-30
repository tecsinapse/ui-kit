import React from 'react';

export const DivFlex = ({ children, style, ...rest }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'auto',
      width: '100%',
      ...style,
    }}
  >
    {React.cloneElement(children, { ...rest })}
  </div>
);
