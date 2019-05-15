import React from 'react';
import { SearchDialog } from './SearchDialog';
import { SelectAllButton } from './SelectAllButton';

export const Menu = ({
  menuPlacement,
  theme,
  selectProps,
  innerProps,
  children,
}) => (
  <SearchDialog
    label={selectProps.label}
    selectProptMessage={selectProps.selectPromptMessage}
    setMenuIsOpen={selectProps.setMenuIsOpen}
  >
    {selectProps.isMulti && selectProps.allowSelectAll && (
      <SelectAllButton {...selectProps} />
    )}
    {children}
  </SearchDialog>
);
