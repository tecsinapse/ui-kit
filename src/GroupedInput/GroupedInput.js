import React from 'react';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { FormHelperText, Typography } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Input } from '../Inputs/Input';
import { Divider } from '../Divider/Divider';
import { IconButton } from '../Buttons/IconButton';
import { defaultRed } from '../colors';
import { Button } from '../Buttons/Button';

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1.2),
  },
  marginLeft: {
    marginLeft: theme.spacing(1),
  },
  paddingCropped: {
    padding: theme.spacing(1 / 4),
  },
  input: {
    flexGrow: 1,
    marginTop: 0,
    marginLeft: theme.spacing(2 / 3),
    marginRight: theme.spacing(2 / 3),
    marginBottom: theme.spacing(1.2),
  },
  flexPadding: {
    padding: theme.spacing(0.5),
  },
  empty: {
    marginBottom: theme.spacing(0.5),
  },
  errorLabel: {
    color: defaultRed,
  },
  paddingRight: {
    paddingRight: theme.spacing(1.2),
  },
}));

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
}) => {
  const classes = useStyles();
  const errorIsArray = error instanceof Array;
  return (
    <div>
      <div className={classes.flex}>
        <Typography
          variant="h6"
          className={clsx({ [classes.errorLabel]: !!error })}
        >
          {header} {!!error && '* '}
        </Typography>

        <Button
          type="button"
          customVariant="warning"
          variant="contained"
          size="small"
          className={classes.marginLeft}
          onClick={push}
          aria-label="Novo Campo"
        >
          <Add />
          Novo Campo
        </Button>
      </div>
      {!!error && !errorIsArray && (
        <FormHelperText className={classes.errorLabel}>{error}</FormHelperText>
      )}

      <Grid
        container
        spacing={spacing}
        className={clsx(
          { [classes.empty]: values.length === 0 },
          classes.paddingRight
        )}
      >
        {values.map((value, index) => (
          // we can use key here as the list is never reordered
          <Grid
            item
            xs={xs}
            sm={sm}
            // eslint-disable-next-line
            key={`${name}.${index}`}
            lg={lg}
            xl={xl}
          >
            <Input
              mask={mask}
              error={errorIsArray ? error[index] : undefined}
              success={
                success && success.length > index ? success[index] : undefined
              }
              warning={
                warnings && warnings.length > index
                  ? warnings[index]
                  : undefined
              }
              label={`${label} #${index + 1}`}
              value={value}
              name={`${name}.${index}`}
              onChange={onChange}
              onBlur={onBlur}
              className={classes.input}
              fullWidth
              endAdornment={
                <IconButton
                  customVariant="error"
                  className={classes.paddingCropped}
                  onClick={() => remove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          </Grid>
        ))}
      </Grid>
      {hr && <Divider />}
    </div>
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
};
