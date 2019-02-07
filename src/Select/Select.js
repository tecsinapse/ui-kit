import { Tooltip, withStyles } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import ReactSelect from 'react-select';
import { flatten, getAnyFromArray } from '@tecsinapse/es-utils/core/object';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { useTheme } from '@material-ui/styles';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';

import { Help } from '@material-ui/icons';
import { selectInputStyle } from './SelectInputStyle';
import { SelectCustomComponents } from './SelectCustomComponents';
import { selectCustomWebComponents } from './SelectCustomWebComponents';
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
  warning,
  error,
  success,
  isMulti = false,
  ...rest
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  let { variant } = rest;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  if (variant === 'auto') {
    if (!matches) {
      variant = 'mobile';
    } else {
      variant = 'web';
    }
  }

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
    value: !isMulti
      ? getAnyFromArray(map.filter(c => c.value === value))
      : map.filter(c => value.includes(c.value)),
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

    onChange: input2 => {
      if (setMenuIsOpen !== undefined) {
        setMenuIsOpen(false);
      }
      onChange(
        input2 instanceof Array ? input2.map(c => c.value) : input2.value
      );
    },
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
        }
      : {
          ...defaultProps,
          menuPlacement,
          components: selectCustomWebComponents,
        };

  return (
    <FormControl
      key={key}
      error={!!error}
      fullWidth={fullWidth}
      style={{ minWidth: '200px' }}
    >
      <ReactSelect {...selectProps} />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

SelectUnstyled.defaultProps = {
  fullWidth: false,
  variant: 'auto',
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
  success: PropTypes.bool,
  warning: PropTypes.bool,
  isMulti: PropTypes.bool,
  variant: PropTypes.oneOf(['auto', 'mobile', 'web']),
  touched: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  onChange: PropTypes.func,
};

export default SelectUnstyled;
export const Select = withStyles(theme => ({
  ...selectInputStyle(theme),
  ...inputStyles(theme),
}))(SelectUnstyled);
