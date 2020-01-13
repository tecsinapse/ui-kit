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
  className,
  styleProps,
}) => {
  const items = normalizeFunctionItems(oldItems);
  const [search, setSearch] = useState('');
  let searchResults = [];
  if (search != null) {
    searchResults = searchLogic(items, search);
  }
  return (
    <MuiDrawer open={open} onClose={onClose} id={id} className={className}>
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
          {!search && (
            <MenuList
              closeDrawer={onClose}
              items={items}
              styleProps={styleProps}
            />
          )}
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
  className: undefined,
  styleProps: undefined,
};
const menuItemShape = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  component: PropTypes.object,
  componentProps: PropTypes.object,
  styleProps: PropTypes.object,
};
menuItemShape.children = PropTypes.arrayOf(PropTypes.shape(menuItemShape));

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  styleProps: PropTypes.object,
  className: PropTypes.string,
  subtitle: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  /** This prop have a `children` attribute where you can nest sub items */
  items: PropTypes.arrayOf(PropTypes.shape(menuItemShape)).isRequired,
  searchBarPlaceholder: PropTypes.string,
};
export default Drawer;
