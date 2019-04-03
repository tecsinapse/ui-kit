import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';
import React from 'react';
import { SizeMe } from 'react-sizeme';
import CancelIcon from '@material-ui/icons/Cancel';

export function MultiValue({ children, selectProps, removeProps, isFocused }) {
  const maxLenghtOption = 20;
  const label =
    children.length > maxLenghtOption
      ? `${children.slice(0, maxLenghtOption)}...`
      : children;
  return (
    <SizeMe>
      {({ size }) => (
        // console.log(size);
        <Chip
          tabIndex={-1}
          label={label}
          className={classNames(selectProps.childrenClasses.chip, {
            [selectProps.childrenClasses.chipFocused]: isFocused,
          })}
          onDelete={removeProps.onClick}
          deleteIcon={<CancelIcon {...removeProps} />}
        />
      )}
    </SizeMe>
  );
}
