import { flatten, getAnyFromArray } from '@tecsinapse/es-utils';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Tooltip } from '@material-ui/core';
import Help from '@material-ui/icons/Help';
import { MOBILE_COMPONENTS } from 'components/Select/MobileComponents';
import { WEB_COMPONENTS } from 'components/Select/WebComponents';
import { calculateValuesSizes } from 'components/Select/utils/selectHelper';
import FormControl from '@material-ui/core/FormControl';
import { SizeMe } from 'react-sizeme';
import ReactSelect from 'react-select';
import FormHelperText from '@material-ui/core/FormHelperText';

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
  labelNotFound,
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
  customTextField,
  ...rest
}) => {
  const isBrowser = typeof window !== 'undefined';

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
    labelNotFound,
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
      classes,
      warning,
      InputLabelProps: {
        shrink: true,
        classes: { outlined: classes.noZIndex },
      },
      ...customTextField,
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
      const emptyValue = isMulti ? [] : '';
      const inputValue = input2 ? input2.value : emptyValue;

      onChange(input2 instanceof Array ? input2.map(c => c.value) : inputValue);
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
          components: MOBILE_COMPONENTS,
          menuPortalTarget: isBrowser ? document.body : null,
          backspaceRemovesValue: false,
          deleteRemovesValue: false,
          ...defaultProps,
        }
      : {
          menuPlacement,
          ...(portal && {
            styles: { menuPortal: base => ({ ...base, zIndex: 9999 }) },
            menuPortalTarget: isBrowser ? document.body : null,
          }),
          components: WEB_COMPONENTS,
          ...defaultProps,
        };

  const valuesWidth = useMemo(() => calculateValuesSizes(selectProps.options), [
    selectProps.options,
  ]);

  const style = { minWidth };

  return (
    isBrowser && (
      <div ref={selectRef}>
        <FormControl
          key={key}
          error={!!error}
          fullWidth={fullWidth}
          style={style}
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
    )
  );
};

export default SelectUnstyled;
