import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { TextFieldComponent } from '../Inputs/Input';

const useStyles = makeStyles({
  flex: {
    display: 'flex !important',
    // Material v4 inserts a fixed height to InputBase breaking the select style
    // See: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/InputBase/InputBase.js#L81
    height: '1.75em',
  },
});

export function InputComponentReact({ inputRef, className, ...props }) {
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
      inputComponent: InputComponentReact,
      inputProps: {
        className: classNames(selectProps.childrenClasses.input, {
          [selectProps.childrenClasses.inputMultilineDense]:
            selectProps.isMulti && selectProps.value.length > 0,
          [selectProps.childrenClasses.inputNormal]:
            !selectProps.isMulti ||
            (selectProps.isMulti && selectProps.value.length === 0),
        }),
        inputRef: innerRef,
        children,
        ...innerProps,
      },
    }}
    {...selectProps.textFieldProps}
    classes={selectProps.childrenClasses}
  />
);
