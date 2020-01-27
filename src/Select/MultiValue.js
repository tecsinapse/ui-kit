import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import { getLabelSliced } from './CalculateOptionsWidth';

export function MultiValue({ children, selectProps, removeProps, isFocused }) {
  const label = getLabelSliced(children);

  return (
    <Chip
      size="small"
      tabIndex={-1}
      label={label}
      className={clsx({
        [selectProps.childrenClasses.chip]: selectProps.variant === 'web',
        [selectProps.childrenClasses.chipFocused]: isFocused,
      })}
      onDelete={removeProps ? removeProps.onClick : undefined}
      deleteIcon={removeProps ? <CancelIcon {...removeProps} /> : undefined}
    />
  );
}
