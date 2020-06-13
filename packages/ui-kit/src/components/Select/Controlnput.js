import React from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { TextFieldComponent } from '../Inputs/Input';

const useStyles = makeStyles({
  inputBaseCustom: {
    display: 'flex !important',
    padding: '14.5px  14px',
    height: '27px',
  },
});

export function InputComponentReactMobile({ inputRef, className, ...props }) {
  const classes = useStyles();
  const newClass = clsx(classes.inputBaseCustom, className);

  return <div ref={inputRef} className={newClass} {...props} />;
}

export function InputComponentReact({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
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
      inputComponent:
        selectProps.variant === 'mobile' && selectProps.isMulti
          ? InputComponentReactMobile
          : InputComponentReact,
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
