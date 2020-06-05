import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import { AddButton } from '../AddButton/AddButton';
import { Input } from '../../Inputs/Input';
import { IconButton } from '../../Buttons/IconButton';

export const InputItemGroupInput = React.memo(
  ({
    mask,
    classes,
    errorIsArray,
    success,
    error,
    index,
    warnings,
    label,
    value,
    name,
    onChange,
    onBlur,
    remove,
    exibeDeleteButton,
    exibeAddButton,
    xs = 12,
    sm,
    lg,
    xl,
    push,
  }) => {
    const onClick = () => remove(index);
    return (
      <Grid key={index} item xs={xs} sm={sm} lg={lg} xl={xl}>
        <div className={classes.inputContainer}>
          <div className={classes.inputFullWidth}>
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
                exibeDeleteButton ? (
                  <IconButton
                    className={classes.paddingCropped}
                    onClick={onClick}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  undefined
                )
              }
            />
          </div>
          {exibeAddButton && <AddButton push={push} classes={classes} />}
        </div>
      </Grid>
    );
  }
);
