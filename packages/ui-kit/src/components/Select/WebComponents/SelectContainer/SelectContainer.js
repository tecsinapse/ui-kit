import React from 'react';
import { components } from 'react-select';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
  base: {
    minWidth: '50px',
    '&:focus': {
      outline: 'none',
    },
  },
});

export const SelectContainer = ({ children, selectProps, ...props }) => {
  const classes = useStyle();

  return (
    <div
      name={selectProps.name}
      tabIndex={Math.floor(Math.random() * 80)}
      className={classes.base}
    >
      <components.SelectContainer {...props}>
        {children}
      </components.SelectContainer>
    </div>
  );
};
