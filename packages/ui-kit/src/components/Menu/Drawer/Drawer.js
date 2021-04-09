import React, { useState } from 'react';
import { Drawer as MuiDrawer } from '@material-ui/core';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import { ListHeader } from './ListHeader';
import { normalizeFunctionItems, searchLogic } from './utils';
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
  srcAvatar,
  logoProps,
  userName,
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
            userName={userName}
            logoProps={logoProps}
            srcAvatar={srcAvatar}
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
  component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.element,
    PropTypes.elementType,
  ]),
  componentProps: PropTypes.object,
  styleProps: PropTypes.object,
};

const logoShape = {
  src: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

menuItemShape.children = PropTypes.arrayOf(PropTypes.shape(menuItemShape));

Drawer.propTypes = {
  /** Display drawer */
  open: PropTypes.bool.isRequired,
  /** Close drawer func */
  onClose: PropTypes.func.isRequired,
  /** Drawer title */
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  /** Styles passed to MenuList */
  styleProps: PropTypes.object,
  /** CSS class passed to root Drawer */
  className: PropTypes.string,
  /** Drawer subtitle */
  subtitle: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  /** Items passed to menu. This prop have a `children` attribute where you can nest sub items */
  items: PropTypes.arrayOf(PropTypes.shape(menuItemShape)).isRequired,
  /** Search placeholder */
  searchBarPlaceholder: PropTypes.string,
  /** source image avatar */
  srcAvatar: PropTypes.string,
  /** props logo */
  logoProps: PropTypes.shape(logoShape),
};

export default Drawer;
