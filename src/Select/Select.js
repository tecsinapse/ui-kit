import { Tooltip, withStyles } from '@material-ui/core';
import React, { useEffect, useRef, Fragment, useState } from 'react';
import { flatten, getAnyFromArray } from '@tecsinapse/es-utils/core/object';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { useTheme } from '@material-ui/styles';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { Help } from '@material-ui/icons';
import { SizeMe } from 'react-sizeme';
import { selectInputStyle } from './SelectInputStyle';
import { SelectMobileCustomComponents } from './SelectMobileCustomComponents';
import { selectCustomWebComponents } from './SelectCustomWebComponents';
import { inputStyles } from '../Inputs/InputStyles';
import { calculateValuesSizes } from './CalculateOptionsWidth';

export const SelectUnstyled = ({
  value,
  onChange,
  onBlur,
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
  allowSelectAll = true,
  selectPromptMessage = 'Selecione',
  portal,
  ...rest
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const [containerSize, setContainerSize] = useState(0);

  const [yPos, setYPos] = useState(0);
  let { variant } = rest;
  const selectRef = useRef();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  if (variant === 'auto') {
    if (!matches) {
      variant = 'mobile';
    } else {
      variant = 'web';
    }
  }

  useEffect(() => {
    const pos = selectRef.current.getBoundingClientRect();
    setYPos(pos.y);
  });

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
    yPos,
    selectPromptMessage,
    isMulti,
    menuIsOpen,
    setMenuIsOpen,
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
    allSelected,
    allowSelectAll,
    meta: { touched, error },
    hideSelectedOptions: false,
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
      if (setMenuIsOpen !== undefined && !isMulti) {
        setMenuIsOpen(false);
      }

      if (isMulti) {
        setAllSelected(
          input2 instanceof Array &&
            input2.map(c => c.value).length === map.length
        );
      }

      onChange(
        input2 instanceof Array ? input2.map(c => c.value) : input2.value
      );
    },
    onBlur: event => {
      if (onBlur) {
        onBlur(event);
      }
      setMenuIsOpen(false);
    },
    selectAll: event => {
      onChange(!allSelected ? options.map(c => c.value) : []);
      setAllSelected(!allSelected);
    },
    ...rest,
    containerSize,
    setContainerSize,
  };

  const selectProps =
    variant === 'mobile'
      ? {
          components: SelectMobileCustomComponents,
          menuPortalTarget: document.body,
          backspaceRemovesValue: false,
          deleteRemovesValue: false,
          ...defaultProps,
        }
      : {
          menuPlacement,
          ...(portal && {
            styles: { menuPortal: base => ({ ...base, zIndex: 9999 }) },
            menuPortalTarget: document.body,
          }),
          components: selectCustomWebComponents,
          ...defaultProps,
        };

  const valuesWidth = calculateValuesSizes(selectProps.options);
  return (
    <div ref={selectRef}>
      <FormControl
        key={key}
        error={!!error}
        fullWidth={fullWidth}
        style={{ minWidth: '200px' }}
      >
        <SizeMe noPlaceholder>
          {({ size }) => (
            <ReactSelect
              {...selectProps}
              valuesWidth={valuesWidth}
              selectSize={size}
            />
          )}
        </SizeMe>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </div>
  );
};

SelectUnstyled.defaultProps = {
  allowSelectAll: true,
  fullWidth: false,
  portal: false,
  variant: 'auto',
  success: false,
  warning: false,
  disabled: false,
  isMulti: false,
  label: null,
  onChange: null,
  onBlur: null,
  error: null,
  touched: false,
  selectPromptMessage: 'Selecione',
  selectAllMessage: 'Selecionar todos',
};
SelectUnstyled.propTypes = {
  allowSelectAll: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  isMulti: PropTypes.bool,
  variant: PropTypes.oneOf(['auto', 'mobile', 'web']),
  touched: PropTypes.bool,
  portal: PropTypes.bool,
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
  onBlur: PropTypes.func,
  selectPromptMessage: PropTypes.string,
  selectAllMessage: PropTypes.string,
};

export default SelectUnstyled;
export const Select = withStyles(theme => ({
  ...selectInputStyle(theme),
  ...inputStyles(theme),
}))(SelectUnstyled);
