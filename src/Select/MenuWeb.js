import Paper from '@material-ui/core/Paper';
import React from 'react';
import { SelectAllButton } from './SelectAllButton';

export const MenuWeb = ({
  menuPlacement,
  theme,
  selectProps,
  innerProps,
  children,
}) => {
  let menuPlacementAux = menuPlacement;

  if (menuPlacementAux === 'auto') {
    if (selectProps.yPos > window.innerHeight / 2) {
      menuPlacementAux = 'top';
    } else {
      menuPlacementAux = 'bottom';
    }
  }

  const style = {
    ...(menuPlacementAux === 'bottom'
      ? { marginTop: theme.spacing.unit }
      : { bottom: 35 }),
    zIndex: 999999,
    overflow: 'visible',
  };

  return (
    <Paper
      square
      className={selectProps.childrenClasses.paper}
      style={style}
      {...innerProps}
    >
      {selectProps.isMulti && selectProps.allowSelectAll && (
        <SelectAllButton {...selectProps} />
      )}
      {children}
    </Paper>
  );
};
