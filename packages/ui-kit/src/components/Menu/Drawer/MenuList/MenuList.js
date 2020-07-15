import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import List from '@material-ui/core/List';
import { MenuItem } from '../MenuItem/MenuItem';
import { selectedTitlesTree } from '../utils/searchLogic';

const useStyles = makeStyles(theme => ({
  parentList: {
    width: theme.spacing(25),
  },
}));

export const MenuList = ({
  closeDrawer,
  items,
  depth = 0,
  showAsOpen,
  styleProps,
}) => {
  const array = selectedTitlesTree(items);
  const object = {};

  array.forEach(key => {
    object[key] = true;
  });
  const [open, setOpen] = useState(object);
  const classes = useStyles();
  const handleClick = clickedKey =>
    setOpen(prevOpen => {
      const newOpen = {};

      Object.keys(prevOpen)
        .concat([clickedKey])
        .forEach(key => {
          if (key === clickedKey) {
            newOpen[key] = !prevOpen[key];
          } else {
            newOpen[key] = false;
          }
        });

      return newOpen;
    });

  return (
    <List className={classes.parentList} disablePadding>
      {items.map(
        ({
          title: newTitle,
          component,
          componentProps,
          children,
          selected,
        }) => {
          const title = typeof newTitle === 'function' ? newTitle() : newTitle;

          return (
            <MenuItem
              depth={depth}
              key={title}
              title={title}
              component={component}
              componentProps={componentProps}
              open={open[title]}
              showAsOpen={showAsOpen}
              selected={selected}
              styleProps={styleProps}
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
                  styleProps={styleProps}
                />
              ) : null}
            </MenuItem>
          );
        }
      )}
    </List>
  );
};
