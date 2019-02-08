import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';
import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';

export function MultiValue({ children, selectProps, removeProps, isFocused }) {
  return (
    <Chip
      tabIndex={-1}
      label={children.slice(0, 10)}
      className={classNames(selectProps.childrenClasses.chip, {
        [selectProps.childrenClasses.chipFocused]: isFocused,
      })}
      onDelete={removeProps.onClick}
      deleteIcon={<CancelIcon {...removeProps} />}
    />
  );
}
