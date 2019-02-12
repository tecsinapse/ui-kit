import React, { useState } from 'react';
import { Drawer as MuiDrawer } from '@material-ui/core';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import { ListHeader } from './ListHeader';
import { searchLogic } from './searchLogic';
import { SearchResultListing } from './SearchResultListing';
import { MenuList } from './MenuList';

const StyledDiv = styled('div')({
  '&&': {
    overflowY: 'scroll',
    overflow: '-moz-scrollbars-none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': { width: '0 !important' },
  },
});

export const Drawer = ({ items, open, onClose }) => {
  const [search, setSearch] = useState('');
  let searchResults = [];
  if (search != null) {
    searchResults = searchLogic(items, search);
  }
  return (
    <MuiDrawer open={open} onClose={onClose}>
      <StyledDiv>
        <div>
          <ListHeader search={search} setSearch={setSearch} />
        </div>
        <div>
          {!search && <MenuList closeDrawer={onClose} items={items} />}
          {search && <SearchResultListing searchResults={searchResults} />}
        </div>
      </StyledDiv>
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
