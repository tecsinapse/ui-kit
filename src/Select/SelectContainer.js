import React from 'react';
import { components } from 'react-select';
import { withStyles } from '@material-ui/core/styles';

const withStylesProps = styles => Component => props => {
  const Comp = withStyles(theme => styles(theme, props))(Component);
  return <Comp {...props} />;
};

const divStyles = (theme, { selectProps }) => {
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
  return {
    divStyled: {
      height: 47,
      borderBottom: `${size} ${borderStyle} ${color}`,
      '&:focus': { outline: 'none !important' },
    },
  };
};
export const SelectContainer = withStylesProps(divStyles)(
  ({ children, selectProps, classes, ...props }) => (
    <div
      className={classes.divStyled}
      name={selectProps.name}
      tabIndex={Math.floor(Math.random() * 80)}
    >
      <components.SelectContainer {...props}>
        {children}
      </components.SelectContainer>
    </div>
  )
);
