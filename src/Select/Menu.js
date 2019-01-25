import React from 'react';
import { SearchDialog } from './SearchDialog';

export const Menu = ({
  menuPlacement,
  theme,
  selectProps,
  innerProps,
  children,
}) => (
  <SearchDialog
    label={selectProps.label}
    setMenuIsOpen={selectProps.setMenuIsOpen}
  >
    {children}
  </SearchDialog>
);
