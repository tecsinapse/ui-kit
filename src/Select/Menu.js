/* eslint-disable react/jsx-props-no-spreading */
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
    selectPromptMessage={selectProps.selectPromptMessage}
    setMenuIsOpen={selectProps.setMenuIsOpen}
  >
    {selectProps.isMulti && selectProps.allowSelectAll && (
      <SelectAllButton {...selectProps} />
    )}
    {children}
  </SearchDialog>
);
