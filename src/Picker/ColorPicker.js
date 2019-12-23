import React from 'react';
import MakedColorPicker from '@tecsinapse/material-ui-color-picker';
import {Input} from '@tecsinapse/ui-kit';
import {converters, DEFAULT_CONVERTER,} from '@tecsinapse/material-ui-color-picker/lib/transformers';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';

export const ColorPicker = props => (
  <MakedColorPicker TextFieldComponent={Input} {...props} />
);
ColorPicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  convert: PropTypes.oneOf(Object.keys(converters)),
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  hintText: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  floatingLabelText: PropTypes.string,
  TextFieldProps: PropTypes.shape(TextField.propTypes),
  TextFieldComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
  ]),
  showPicker: PropTypes.bool,
  setShowPicker: PropTypes.func,
  internalValue: PropTypes.string,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
};
ColorPicker.defaultProps = {
  convert: DEFAULT_CONVERTER,
  disabled: false,
};

export default ColorPicker;
