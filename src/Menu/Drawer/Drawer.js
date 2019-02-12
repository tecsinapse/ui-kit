import React, { useState } from 'react';
import { Drawer as MuiDrawer } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { ListHeader } from './ListHeader';
import { searchLogic } from './searchLogic';
import { SearchResultListing } from './SearchResultListing';
import { MenuList } from './MenuList';

const ScrollableDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'stretch',
});
const OverflowYDiv = styled('div')({
  flexGrow: 1,
  overflowY: 'scroll',
  overflow: '-moz-scrollbars-none',
  '-ms-overflow-style': 'none',
  '&::-webkit-scrollbar': { width: '0 !important' },
});

export const Drawer = ({ items, open, onClose }) => {
  const [search, setSearch] = useState('');
  let searchResults = [];
  if (search != null) {
    searchResults = searchLogic(items, search);
  }
  return (
    <MuiDrawer open={open} onClose={onClose}>
      <ScrollableDiv>
        <div>
          <ListHeader search={search} setSearch={setSearch} />
        </div>
        <OverflowYDiv>
          {!search && <MenuList closeDrawer={onClose} items={items} />}
          {search && <SearchResultListing searchResults={searchResults} />}
        </OverflowYDiv>
      </ScrollableDiv>
    </MuiDrawer>
  );
};

Drawer.defaultProps = {};
const menuItemShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  component: PropTypes.object,
  componentProps: PropTypes.object,
});
menuItemShape.children = PropTypes.arrayOf(PropTypes.shape(menuItemShape));

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(menuItemShape).isRequired,
};
export default Drawer;
