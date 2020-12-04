import React from 'react';
import { SearchDialog } from 'components/Select/MobileComponents/SearchDialog';
import { SelectAllButton } from 'components/Select/CommonComponents/SelectAllButton';

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
