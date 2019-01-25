import { withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import ReactSelect from 'react-select';
import {
  flatten,
  getAnyFromArray,
} from '@tecsinapse/tecsinapse-es-utils/objectUtils';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { selectInputStyle } from './SelectInputStyle';
import { SelectCustomComponents } from './SelectCustomComponents';

export const Select = withStyles(selectInputStyle)(
  ({
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
    error,
    touched,
    menuPlacement = 'bottom',
    key,
    fullWidth,
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
    return (
      <FormControl key={key} error={!!error} fullWidth={fullWidth}>
        <ReactSelect
          {...rest}
          value={getAnyFromArray(map.filter(c => c.value === value))}
          isDisabled={disabled}
          onChange={input2 => {
            onChange(input2.value);
            setMenuIsOpen(false);
          }}
          options={map}
          className={classes.select}
          childrenClasses={classes}
          label={label}
          menuIsOpen={menuIsOpen}
          setMenuIsOpen={setMenuIsOpen}
          components={SelectCustomComponents}
          menuPortalTarget={document.body}
          placeholder={placeholder || label || ''}
          backspaceRemovesValue={false}
          deleteRemovesValue={false}
          meta={{ touched, error }}
          name={name}
        />
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }
);

Select.defaultProps = {
  fullWidth: false,
  success: false,
  warning: false,
  disabled: false,
  label: null,
  onChange: null,
  error: null,
  touched: false,
};
Select.propTypes = {
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  touched: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.object,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  onChange: PropTypes.func,
};

export default Select;
