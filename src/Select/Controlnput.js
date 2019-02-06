import React from "react";
import {TextFieldComponent} from "../Inputs/Input";

export function inputComponentReact({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

export const Controlnput = ({ selectProps, innerProps, innerRef, children}) => <TextFieldComponent
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
/>;
