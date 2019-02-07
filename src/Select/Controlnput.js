import React from 'react';
import { makeStyles, } from '@material-ui/styles';
import classNames from 'classnames';
import { TextFieldComponent } from '../Inputs/Input';

const useStyles = makeStyles({
  flex: {
    display: 'flex !important',
  },
});

export function inputComponentReact({ inputRef, className, ...props }) {
  const classes = useStyles();
  const newClass = classNames(classes.flex, className);
  return <div ref={inputRef} className={newClass} {...props} />;
}

export const Controlnput = ({
  selectProps,
  innerProps,
  innerRef,
  children,
}) => (
  <TextFieldComponent
    fullWidth
    InputProps={{
      inputComponent: inputComponentReact,
      inputProps: {
        className: selectProps.childrenClasses.input,
        inputRef: innerRef,
        children,
        ...innerProps,
      },
    }}
    {...selectProps.textFieldProps}
    classes={selectProps.childrenClasses}
  />
);
