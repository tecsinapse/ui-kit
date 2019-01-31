import React from 'react';
import { components } from 'react-select';
import { withStyles } from '@material-ui/core/styles';

const style = {
  divStyledSelect: {
    height: 47,
    '&:focus': { outline: 'none !important' },
  },
};

export const SelectContainer = withStyles(style)(
  ({ children, selectProps, classes, ...props }) => {
    let color = 'rgba(0, 0, 0, 0.42)';
    let borderStyle = 'solid';
    let size = '1px';

    if (selectProps.isDisabled) {
      borderStyle = 'dotted';
    }

    if (selectProps.meta.error && selectProps.meta.touched) {
      color = 'red';
      size = '2px';
    }

    const styleDiv = {
      divStyled: {
        borderBottom: `${size} ${borderStyle} ${color}`,
      },
    };

    return (
      <div
        style={styleDiv.divStyled}
        name={selectProps.name}
        className={classes.divStyledSelect}
        tabIndex={Math.floor(Math.random() * 80)}
      >
        <components.SelectContainer {...props}>
          {children}
        </components.SelectContainer>
      </div>
    );
  }
);
