import React from 'react';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { FormHelperText, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input } from '../Inputs/Input';
import { Divider } from '../Divider/Divider';
import { Button } from '../Buttons/Button';
import { IconButton } from '../Buttons/IconButton';
import { defaultRed } from '../colors';

const useStyles = makeStyles(({ spacing }) => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: spacing.unit / 2,
    marginBottom: spacing.unit / 2,
  },
  marginLeft: {
    marginLeft: spacing.unit,
  },
  paddingCropped: {
    padding: spacing.unit / 4,
  },
  input: {
    flexGrow: 1,
    margin: spacing.unit / 1.5,
  },
  flexPadding: {
    padding: spacing.unit / 2,
  },
  empty: {
    marginBottom: spacing.unit / 2,
  },
  errorLabel: {
    color: defaultRed,
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
  spacing = 8,
  xs = 4,
  sm,
}) => {
  const classes = useStyles();
  const errorIsArray = error instanceof Array;
  return (
    <div>
      <Divider />
      <div className={classes.flex}>
        <Typography
          variant="subtitle2"
          className={classNames({ [classes.errorLabel]: !!error })}
        >
          {header} {!!error && '* '}
        </Typography>
        <Button
          type="button"
          variant="warning"
          size="small"
          className={classes.marginLeft}
          onClick={push}
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
        className={classNames({ [classes.empty]: values.length === 0 })}
      >
        {values.map((value, index) => (
          // we can use key here as the list is never reordered
          // eslint-disable-next-line
          <Grid item xs={xs} sm={sm} key={`${name}.${index}`}>
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
                  variant="error"
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
      <Divider />
    </div>
  );
};

GroupedInput.defaultProps = {
  error: null,
  success: [],
  warnings: [],
  spacing: 8,
  xs: 4,
  sm: undefined,
};
GroupedInput.propTypes = {
  name: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  success: PropTypes.arrayOf(PropTypes.bool),
  warnings: PropTypes.arrayOf(PropTypes.bool),
  push: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  spacing: PropTypes.number,
  xs: PropTypes.number,
  sm: PropTypes.number,
};
