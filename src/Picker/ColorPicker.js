import React from 'react';
import MakedColorPicker from '@tecsinapse/material-ui-color-picker';
import { Input } from '../Inputs/Input';

export const ColorPicker = props => (
  <MakedColorPicker TextFieldComponent={Input} {...props} />
);
ColorPicker.propTypes = MakedColorPicker.propTypes;
ColorPicker.defaultProps = MakedColorPicker.defaultProps;

export default ColorPicker;
