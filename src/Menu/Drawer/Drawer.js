import React, { useState } from 'react';
import { Drawer as MuiDrawer } from '@material-ui/core';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import { ListHeader } from './ListHeader';
import { normalizeFunctionItems, searchLogic } from './searchLogic';
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

export const Drawer = ({
  items: oldItems,
  open,
  onClose,
  title,
  subtitle,
  searchBarPlaceholder,
  productName,
  id,
}) => {
  const items = normalizeFunctionItems(oldItems);
  const [search, setSearch] = useState('');
  let searchResults = [];
  if (search != null) {
    searchResults = searchLogic(items, search);
  }
  return (
    <MuiDrawer open={open} onClose={onClose} id={id}>
      <StyledDiv>
        <div>
          <ListHeader
            search={search}
            setSearch={setSearch}
            title={title}
            searchBarPlaceholder={searchBarPlaceholder}
            subtitle={subtitle}
            productName={productName}
          />
        </div>
        <div>
          {!search && <MenuList closeDrawer={onClose} items={items} />}
          {search && (
            <SearchResultListing
              onClick={() => {
                onClose();
                setSearch('');
              }}
              searchResults={searchResults}
            />
          )}
        </div>
      </StyledDiv>
    </MuiDrawer>
  );
};

Drawer.defaultProps = {
  searchBarPlaceholder: 'O que você busca?',
  id: undefined,
};
const menuItemShape = PropTypes.shape({
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  component: PropTypes.object,
  componentProps: PropTypes.object,
});
menuItemShape.children = PropTypes.arrayOf(PropTypes.shape(menuItemShape));

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  subtitle: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(menuItemShape).isRequired,
  searchBarPlaceholder: PropTypes.string,
};
export default Drawer;
