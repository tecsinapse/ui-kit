import Paper from '@material-ui/core/Paper';
import React from 'react';
import { components } from 'react-select';
import { SelectAllButton } from 'components/Select/CommonComponents';

export const MenuWeb = props => {
  const { selectProps, innerProps, children = [] } = props;

  return (
    <components.Menu {...props}>
      <Paper square {...innerProps}>
        {selectProps.isMulti && selectProps.allowSelectAll && (
          <SelectAllButton {...selectProps} />
        )}
        {children || []}
      </Paper>
    </components.Menu>
  );
};
