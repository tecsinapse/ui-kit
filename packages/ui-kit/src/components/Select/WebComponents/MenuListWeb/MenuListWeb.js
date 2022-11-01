import React from 'react';
import { List as MuiList, MenuItem } from '@material-ui/core';

const selectMenuHeight = 50;
const optionsShown = 4;

export const MenuListWeb = props => {
  const { options, children = [] } = props;
  const listSize =
    selectMenuHeight *
    Math.min(
      optionsShown,
      options?.flatMap(e => e.options).length + options?.length || 1
    );

  const listStyle = {
    padding: 0,
    maxHeight: listSize,
    overflowY:
      options?.flatMap(e => e.options).length + options?.length > 4
        ? 'scroll'
        : 'hidden',
    overflowX: 'hidden',
  };

  const notFoundStyle = { height: selectMenuHeight };
  // eslint-disable-next-line react/destructuring-assignment
  const { labelNotFound } = props.selectProps;

  return (
    <MuiList style={listStyle}>
      {Array.isArray(children) ? (
        children.map(i => i)
      ) : (
        <MenuItem disabled style={notFoundStyle}>
          {labelNotFound}
        </MenuItem>
      )}
    </MuiList>
  );
};
