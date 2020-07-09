import React from 'react';
import MakedColorPicker from '@tecsinapse/material-ui-color-picker';
import { Input } from '@tecsinapse/ui-kit';
import {
  converters,
  DEFAULT_CONVERTER,
} from '@tecsinapse/material-ui-color-picker/lib/transformers';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

export const ColorPicker = props => (
  <MakedColorPicker TextFieldComponent={Input} {...props} />
);
ColorPicker.propTypes = {
  /** Value selected */
  value: PropTypes.string,
  /** Change event handler */
  onChange: PropTypes.func,
  /** Color formar converter (rgba, rgb, hex) */
  convert: PropTypes.oneOf(Object.keys(converters)),
  /** Initial value */
  defaultValue: PropTypes.string,
  /** Input name */
  name: PropTypes.string,
  /** Input id */
  id: PropTypes.string,
  hintText: PropTypes.string,
  /** Input placeholder */
  placeholder: PropTypes.string,
  /** Input label */
  label: PropTypes.string,
  /** Input floating label */
  floatingLabelText: PropTypes.string,
  /** Props passed to TextField Input */
  TextFieldProps: PropTypes.shape(TextField.propTypes),
  /** Custom Input component */
  TextFieldComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
  ]),
  /** Show palette picker */
  showPicker: PropTypes.bool,
  /** Show palette open event handler */
  setShowPicker: PropTypes.func,
  internalValue: PropTypes.string,
  /** Set value event handler */
  setValue: PropTypes.func,
  /** Disable the input */
  disabled: PropTypes.bool,
};
ColorPicker.defaultProps = {
  convert: DEFAULT_CONVERTER,
  disabled: false,
};

export default ColorPicker;
