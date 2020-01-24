import React from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { TextFieldComponent } from '../Inputs/Input';

const useStyles = makeStyles({
  flex: {
    display: 'flex !important',
  },
});

export function InputComponentReact({ inputRef, className, ...props }) {
  const classes = useStyles();
  const newClass = clsx(classes.flex, className);
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
        className: clsx(selectProps.childrenClasses.input, {
          [selectProps.childrenClasses.inputMultilineDense]:
            selectProps.variant === 'web' &&
            selectProps.isMulti &&
            selectProps.value.length > 0,
          [selectProps.childrenClasses.inputNormal]:
            selectProps.variant === 'web' &&
            (!selectProps.isMulti ||
              (selectProps.isMulti && selectProps.value.length === 0)),
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
