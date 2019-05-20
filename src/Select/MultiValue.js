import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';
import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import { getLabelSliced } from './CalculateOptionsWidth';

export function MultiValue({ children, selectProps, removeProps, isFocused }) {
  const label = getLabelSliced(children);

  return (
    <Chip
      tabIndex={-1}
      label={label}
      className={classNames(selectProps.childrenClasses.chip, {
        [selectProps.childrenClasses.chipFocused]: isFocused,
      })}
      onDelete={removeProps ? removeProps.onClick : undefined}
      deleteIcon={removeProps ? <CancelIcon {...removeProps} /> : undefined}
    />
  );
}
