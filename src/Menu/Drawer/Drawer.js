import React, { useState } from 'react';
import { Drawer as MuiDrawer } from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/styles';
import { ListHeader } from './ListHeader';
import { MenuItem } from './MenuItem';
import { searchLogic } from './searchLogic';
import { SearchResultListing } from './SearchResultListing';
import { demoItems } from './demoItems';

export const useStyles = makeStyles(theme => ({
  parentList: {
    width: theme.spacing.unit * 30,
  },
}));
const MenuList = ({ closeDrawer, items, depth = 0 }) => {
  const [open, setOpen] = useState({});
  const classes = useStyles();
  const handleClick = key =>
    setOpen(prevOpen => ({
      ...prevOpen,
      [key]: !prevOpen[key],
    }));

  return (
    <List className={classes.parentList} disablePadding>
      {items.map(({ title, children }) => (
        <MenuItem
          depth={depth}
          key={title}
          title={title}
          open={open[title]}
          handleClick={a => {
            if (children) {
              handleClick(a);
            }
          }}
        >
          {children ? (
            <MenuList
              closeDrawer={closeDrawer}
              depth={depth + 1}
              items={children}
            />
          ) : null}
        </MenuItem>
      ))}
    </List>
  );
};
export const Drawer = ({ open, onClose }) => {
  const [search, setSearch] = useState('');
  let searchResults = [];
  if (search != null) {
    searchResults = searchLogic(demoItems, search);
  }
  return (
    <MuiDrawer open={open} onClose={onClose}>
      <ListHeader search={search} setSearch={setSearch} />
      {!search && <MenuList closeDrawer={onClose} items={demoItems} />}
      {search && <SearchResultListing searchResults={searchResults} />}
    </MuiDrawer>
  );
};

Drawer.defaultProps = {};
Drawer.propTypes = {};
export default Drawer;
