import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import List from '@material-ui/core/List';
import { MenuItem } from './MenuItem';
import { selectedTitlesTree } from './searchLogic';

const useStyles = makeStyles(theme => ({
  parentList: {
    width: theme.spacing.unit * 25,
  },
}));
export const MenuList = ({ closeDrawer, items, depth = 0, showAsOpen }) => {
  const array = selectedTitlesTree(items);
  const object = {};
  array.forEach(key => {
    object[key] = true;
  });
  const [open, setOpen] = useState(object);
  const classes = useStyles();
  const handleClick = key =>
    setOpen(prevOpen => ({
      ...prevOpen,
      [key]: !prevOpen[key],
    }));
  return (
    <List className={classes.parentList} disablePadding>
      {items.map(({ title, component, componentProps, children, selected }) => (
        <MenuItem
          depth={depth}
          key={title}
          title={title}
          component={component}
          componentProps={componentProps}
          open={open[title]}
          showAsOpen={showAsOpen}
          selected={selected}
          handleClick={a => {
            if (children) {
              handleClick(a);
            } else {
              closeDrawer();
            }
          }}
        >
          {children ? (
            <MenuList
              closeDrawer={closeDrawer}
              depth={depth + 1}
              items={children}
              showAsOpen={showAsOpen}
            />
          ) : null}
        </MenuItem>
      ))}
    </List>
  );
};
