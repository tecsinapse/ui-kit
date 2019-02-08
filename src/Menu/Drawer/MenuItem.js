import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { mdiMenuDown, mdiMenuUp } from '@mdi/js';
import Icon from '@mdi/react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';

const useStyles = depth =>
  makeStyles(theme => ({
    parentItem: {
      height: theme.spacing.unit * (depth > 0 ? 4 : 5),
      paddingLeft: theme.spacing.unit * (depth + 1),
    },
  }));
export const TitleSubtitleMenuItem = ({ title, subtitle, onClick }) => (
  <ListItem button divider onClick={onClick}>
    <ListItemText
      primary={title}
      secondary={subtitle}
      primaryTypographyProps={{ variant: 'subtitle2' }}
    />
  </ListItem>
);

export const MenuItem = ({ depth, handleClick, open, title, children }) => {
  const classes = useStyles(depth)();
  return (
    <Fragment>
      <ListItem
        button
        divider
        className={classes.parentItem}
        onClick={() => handleClick(title)}
      >
        <ListItemText
          primary={title}
          primaryTypographyProps={{ variant: 'subtitle2' }}
        />
        {children && (
          <Fragment>
            {open ? (
              <Icon path={mdiMenuUp} color="gray" size={1} />
            ) : (
              <Icon path={mdiMenuDown} color="gray" size={1} />
            )}
          </Fragment>
        )}
      </ListItem>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            {children}
          </List>
        </Collapse>
      )}
    </Fragment>
  );
};
