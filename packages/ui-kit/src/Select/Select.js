import { Tooltip, withStyles } from '@material-ui/core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { flatten, getAnyFromArray } from '@tecsinapse/es-utils/build';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import Help from '@material-ui/icons/Help';
import { SizeMe } from 'react-sizeme';
import { selectInputStyle } from './SelectInputStyle';
import { SelectMobileCustomComponents } from './SelectMobileCustomComponents';
import { selectCustomWebComponents } from './SelectCustomWebComponents';
import { inputStyles } from '../Inputs/InputStyles';
import { calculateValuesSizes } from './CalculateOptionsWidth';

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
  minWidth,
  customAction,
  customIndicators,
  ...rest
}) => {
  const valuesAllSelected = isMulti && value && value.length === options.length;
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [allSelected, setAllSelected] = useState(valuesAllSelected);
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
  }, []);

  const map = useMemo(
    () =>
      options !== undefined && options && options.length !== 0
        ? options
        : flattenChildren(children),
    [options, children]
  );

  const defaultProps = {
    yPos,
    selectPromptMessage,
    isMulti,
    menuIsOpen,
    setMenuIsOpen,
    minWidth,
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
      <>
        {endAdornment}
        {tooltip ? (
          <Tooltip title={tooltip} placement="right">
            <Help />
          </Tooltip>
        ) : null}
      </>
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
      if (!document.getElementById('customAction').contains(event.target)) {
        onChange(!allSelected ? options.map(c => c.value) : []);
        setAllSelected(!allSelected);
      }
    },
    ...rest,
    variant,
    containerSize,
    setContainerSize,
    customAction,
    customIndicators,
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

  const valuesWidth = useMemo(() => calculateValuesSizes(selectProps.options), [
    selectProps.options,
  ]);

  return (
    <div ref={selectRef}>
      <FormControl
        key={key}
        error={!!error}
        fullWidth={fullWidth}
        style={{ minWidth }}
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
  minWidth: '200px',
  customIndicators: undefined,
};
SelectUnstyled.propTypes = {
  /** Show 'select' option to select all options */
  allowSelectAll: PropTypes.bool,
  /** Fill div/screen width */
  fullWidth: PropTypes.bool,
  /** Disable Select */
  disabled: PropTypes.bool,
  /** Sucess input variant */
  success: PropTypes.bool,
  /** Warning input variant */
  warning: PropTypes.bool,
  /** Turn multi-selection on */
  isMulti: PropTypes.bool,
  /** Device Select variant view */
  variant: PropTypes.oneOf(['auto', 'mobile', 'web']),
  /** Select is touched */
  touched: PropTypes.bool,
  portal: PropTypes.bool,
  /** Error message/variant */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Input label */
  label: PropTypes.string,
  /** Options available to Select */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  /** Fired when change event */
  onChange: PropTypes.func,
  /** Fired when blur event */
  onBlur: PropTypes.func,
  /** Select prompt placeholder */
  selectPromptMessage: PropTypes.string,
  /** Select all placeholder */
  selectAllMessage: PropTypes.string,
  /** Minimum element width */
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Custom action placed on '`Select all`' line for multi select. The `buttonIcon` prop must be a mdi valid icon. `buttonColor` and `buttonVariant` are material-ui equivalent props. */
  customAction: PropTypes.shape({
    buttonLabel: PropTypes.string.isRequired,
    buttonColor: PropTypes.oneOf(['primary', 'secondary']),
    buttonVariant: PropTypes.oneOf(['contained', 'text', 'outlined']),
    buttonIcon: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.element,
      PropTypes.string,
    ]),
    handleClick: PropTypes.func.isRequired,
  }),
  /** Custom indicators to be placed as adornment */
  customIndicators: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.element,
  ]),
};

export default SelectUnstyled;
export const Select = withStyles(theme => ({
  ...selectInputStyle(theme),
  ...inputStyles(theme),
}))(SelectUnstyled);
