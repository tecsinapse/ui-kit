import { Tooltip, withStyles } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import ReactSelect from 'react-select';
import { flatten, getAnyFromArray } from '@tecsinapse/es-utils/core/object';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { selectInputStyle } from './SelectInputStyle';
import { SelectCustomComponents } from './SelectCustomComponents';
import { selectCustomWebComponents } from './SelectCustomWebComponents';
import { Help } from '@material-ui/icons';
import { inputStyles } from '../Inputs/InputStyles';

export const SelectUnstyled = ({
  value,
  onChange,
  name,
  children,
  tooltip,
  label,
  options = [],
  endAdornment,
  classes,
  disabled,
  placeholder,
  touched,
  menuPlacement = 'bottom',
  key,
  fullWidth,
  variant = 'mobile',
  warning,
  error,
  success,
  isMulti = false,
  ...rest
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const flattenChildren = childrenIn =>
    childrenIn
      ? flatten(childrenIn)
          .filter(c => !!c && !!c.props)
          .map(suggestion => ({
            value: suggestion.props.value,
            label: suggestion.props.children,
            disabled: suggestion.props.disabled || false,
          }))
      : [];

  const map =
    options !== undefined && options && options.length !== 0
      ? options
      : flattenChildren(children);

  const defaultProps = {
    isMulti,
    value: getAnyFromArray(map.filter(c => c.value === value)),
    isDisabled: disabled,
    options: map,
    className: classes.select,
    childrenClasses: classes,
    placeholder: placeholder || label || '',
    label,
    textFieldProps: {
      label,
      disabled,
      error,
      InputLabelProps: {
        shrink: true,
      },
    },
    name,
    meta: { touched, error },

    endAdornment: (
      <Fragment>
        {endAdornment}
        {tooltip ? (
          <Tooltip title={tooltip} placement="right">
            <Help />
          </Tooltip>
        ) : null}
      </Fragment>
    ),
    ...rest,
  };

  const selectProps =
    variant === 'mobile'
      ? {
          ...defaultProps,
          menuIsOpen,
          setMenuIsOpen,
          components: SelectCustomComponents,
          menuPortalTarget: document.body,
          backspaceRemovesValue: false,
          deleteRemovesValue: false,

          onChange: input => {
            onChange(input.value);
            setMenuIsOpen(false);
          },
        }
      : {
          ...defaultProps,
          menuPlacement,
          components: selectCustomWebComponents,
          onChange: input2 => {
            onChange(input2.value);
          },
        };

  return (
    <FormControl
      key={key}
      error={!!error}
      fullWidth={fullWidth}
      style={{ minWidth: '200px' /* , ...style */ }}
    >
      <ReactSelect {...selectProps} />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

SelectUnstyled.defaultProps = {
  fullWidth: false,
  variant: 'mobile',
  success: false,
  warning: false,
  disabled: false,
  isMulti: false,
  label: null,
  onChange: null,
  error: null,
  touched: false,
};
SelectUnstyled.propTypes = {
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  variant: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  onChange: PropTypes.func,
};

export default SelectUnstyled;
export const Select = withStyles(theme => ({
  ...selectInputStyle(theme),
  ...inputStyles(theme),
}))(SelectUnstyled);
