import React from 'react';

export const DivFlex = ({ children, style, ...rest }) => {
  const style1 = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    width: '100%',
    ...style,
  };

  return <div style={style1}>{React.cloneElement(children, { ...rest })}</div>;
};
