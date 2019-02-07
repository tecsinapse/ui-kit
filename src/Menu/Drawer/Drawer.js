import React, { Fragment, useState } from 'react';
import { Drawer as MuiDrawer } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/styles';
import { mdiMenuDown, mdiMenuUp } from '@mdi/js';
import Icon from '@mdi/react';
import { ListHeader } from './ListHeader';

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  parentList: {
    width: theme.spacing.unit * 30,
  },
  parentItem: {
    height: theme.spacing.unit * 5,
  },
}));

const MenuList = ({ closeDrawer, items }) => {
  const [open, setOpen] = useState({});
  const classes = useStyles();
  const handleClick = key =>
    setOpen(prevOpen => ({
      ...prevOpen,
      [key]: !prevOpen[key],
    }));

  return (
    <List className={classes.parentList}>
      <ListHeader />
      {items.map(({ key, title }) => (
        <Fragment>
          <ListItem
            button
            divider
            className={classes.parentItem}
            onClick={() => handleClick(key)}
          >
            <ListItemText
              primary={title}
              primaryTypographyProps={{ variant: 'subtitle2' }}
            />
            {open[key] ? (
              <Icon path={mdiMenuUp} color="gray" size={1} />
            ) : (
              <Icon path={mdiMenuDown} color="gray" size={1} />
            )}
          </ListItem>
          <Collapse in={open[key]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
        </Fragment>
      ))}
    </List>
  );
};

export const Drawer = ({ open, onClose }) => (
  <MuiDrawer open={open} onClose={onClose}>
    <MenuList
      closeDrawer={onClose}
      items={[{ key: 'Olá!', title: 'Portal' }, { key: 'Mundo', title: 'CRM' }]}
    />
  </MuiDrawer>
);

Drawer.defaultProps = {};
Drawer.propTypes = {};
export default Drawer;
