import React from 'react';
import { List as MuiList } from '@material-ui/core';

const selectMenuHeight = 50;
const optionsShown = 4;

export const MenuListWeb = props => {
  const { options, children } = props;

  const listSize = selectMenuHeight * Math.min(optionsShown, options.length);

  const listStyle = {
    padding: 0,
    maxHeight: listSize,
    overflowY: 'scroll',
    overflowX: 'hidden',
  };

  return <MuiList style={listStyle}>{(children || []).map(i => i)}</MuiList>;
};
