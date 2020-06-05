import React, { useState } from 'react';
import { FormHelperText, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Divider } from '../Divider/Divider';
import { useGroupedInputStyles } from './hooks/useGroupedInputStyles';
import { InputItemGroupInput } from './InputItemGroupInput/InputItemGroupInput';

export const GroupedInput = ({
  name,
  values = [],
  error,
  success,
  warnings,
  header,
  push,
  remove,
  onChange,
  mask,
  onBlur,
  label,
  spacing = 1,
  xs = 12,
  sm,
  lg,
  xl,
  hr = false,
  inputType = 'inside',
}) => {
  const classes = useGroupedInputStyles();
  const [valueInput, setValueInput] = useState('');
  const errorIsArray = error instanceof Array;
  const firstItemWithoutList = inputType === 'outside';
  return (
    <>
      <Grid
        container
        spacing={spacing}
        className={clsx(
          { [classes.empty]: values.length === 0 },
          classes.paddingRight
        )}
      >
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <div className={classes.flexWithMarginLeft}>
            <Typography
              variant="h6"
              className={clsx({ [classes.errorLabel]: !!error })}
            >
              {header} {!!error && '* '}
            </Typography>
          </div>
          {!!error && !errorIsArray && (
            <FormHelperText className={classes.errorLabel}>
              {error}
            </FormHelperText>
          )}
        </Grid>

        {(firstItemWithoutList || (values || []).length === 0) && (
          <InputItemGroupInput
            mask={mask}
            classes={classes}
            errorIsArray={errorIsArray}
            success={success}
            error={error}
            warnings={warnings}
            label={label}
            value={valueInput}
            name={name}
            index={-1}
            onChange={e => setValueInput(e.target.value)}
            onBlur={onBlur}
            remove={remove}
            exibeDeleteButton={false}
            xs={xs}
            sm={sm}
            lg={lg}
            xl={xl}
            push={() => {
              onChange(valueInput, values.length);
              setValueInput('');
            }}
            exibeAddButton
          />
        )}

        {values.map((value, index) => (
          <InputItemGroupInput
            // This List will never be reordenaded, then is secure to use this
            // eslint-disable-next-line
            key={`${name}.${index}`}
            mask={mask}
            classes={classes}
            errorIsArray={errorIsArray}
            success={success}
            error={error}
            index={index}
            warnings={warnings}
            label={label}
            value={value}
            name={name}
            onChange={e => onChange(e.target.value, index)}
            onBlur={onBlur}
            remove={remove}
            exibeDeleteButton={firstItemWithoutList || index !== 0}
            xs={xs}
            sm={sm}
            lg={lg}
            xl={xl}
            exibeAddButton={!firstItemWithoutList && index === 0}
            push={() => push(value)}
          />
        ))}
      </Grid>
      {hr && <Divider />}
    </>
  );
};

GroupedInput.defaultProps = {
  error: null,
  success: [],
  warnings: [],
  spacing: 1,
  xs: 12,
  sm: 12,
  lg: 4,
  xl: 4,
  hr: false,
  inputType: 'inside',
};
GroupedInput.propTypes = {
  /** Input name */
  name: PropTypes.string.isRequired,
  /** Component name on header */
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  /** Input label */
  label: PropTypes.string.isRequired,
  /** Array of field values */
  values: PropTypes.array.isRequired,
  /** Error input variant */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /** Success input variant */
  success: PropTypes.arrayOf(PropTypes.bool),
  /** Warning input variant */
  warnings: PropTypes.arrayOf(PropTypes.bool),
  /** Function to execute when pushing a new input */
  push: PropTypes.func.isRequired,
  /** Function to execute when deleting a input */
  remove: PropTypes.func.isRequired,
  /** Change event handler */
  onChange: PropTypes.func.isRequired,
  /** Spacing between inputs */
  spacing: PropTypes.number,
  /** Extra small screen grid size */
  xs: PropTypes.number,
  /** Small screen grid size */
  sm: PropTypes.number,
  /** Large screen grid size */
  lg: PropTypes.number,
  /** Extra large screen grid size */
  xl: PropTypes.number,
  /** Show divider on end */
  hr: PropTypes.bool,
  /** Case 'inside' input field will be values[0], otherwise 'outside' it will be outside list and after input will be values[values.length] */
  inputType: PropTypes.oneOf(['inside', 'outside']),
};
