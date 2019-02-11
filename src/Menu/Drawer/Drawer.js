import React, { useState } from 'react';
import { Drawer as MuiDrawer } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { ListHeader } from './ListHeader';
import { searchLogic } from './searchLogic';
import { SearchResultListing } from './SearchResultListing';
import { demoItems } from './demoItems';
import { MenuList } from './MenuList';

const ScrollableDiv = styled('div')({
  scrollable: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'stretch',
  },
});
const OverflowYDiv = styled('div')({
  grow: {
    flexGrow: 1,
    overflowY: 'scroll',
    overflow: '-moz-scrollbars-none',
    '-ms-overflow-style': 'none',
    '&::-webkit-scrollbar': { width: '0 !important' },
  },
});

export const Drawer = ({ open, onClose }) => {
  const [search, setSearch] = useState('');
  // const classes = useStyles();
  let searchResults = [];
  if (search != null) {
    searchResults = searchLogic(demoItems, search);
  }
  return (
    <MuiDrawer open={open} onClose={onClose}>
      <ScrollableDiv>
        <div>
          <ListHeader search={search} setSearch={setSearch} />
        </div>
        <OverflowYDiv>
          {!search && <MenuList closeDrawer={onClose} items={demoItems} />}
          {search && <SearchResultListing searchResults={searchResults} />}
        </OverflowYDiv>
      </ScrollableDiv>
    </MuiDrawer>
  );
};

Drawer.defaultProps = {};
Drawer.propTypes = {};
export default Drawer;
