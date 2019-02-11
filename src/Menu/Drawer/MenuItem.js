import React, { cloneElement, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { mdiMenuDown, mdiMenuUp } from '@mdi/js';
import Icon from '@mdi/react';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import { grey } from '@material-ui/core/colors';

const useStyles = depth =>
  makeStyles(theme => ({
    item: {
      paddingLeft: theme.spacing.unit * (depth + 1),
    },
    parentItem: {
      height: theme.spacing.unit * 5,
    },
    childItem: {
      height: theme.spacing.unit * 3,
    },
    openItem: {
      backgroundColor: grey[Math.max(1, depth) * 100],
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

export const MenuItem = ({
  depth,
  handleClick,
  open,
  title,
  component = 'div',
  componentProps = {},
  children,
  showAsOpen = false,
  selected = false,
}) => {
  const classes = useStyles(depth)();
  return (
    <Fragment>
      <ListItem
        button
        component={component}
        divider={depth === 0}
        className={classNames({
          [classes.openItem]: open || showAsOpen,
          [classes.parentItem]: depth === 0,
          [classes.childItem]: depth > 0,
          [classes.item]: true,
        })}
        onClick={() => handleClick(title)}
        {...componentProps}
      >
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            variant: 'subtitle2',
            color: selected ? 'textSecondary' : 'textPrimary',
          }}
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
            {cloneElement(children, { showAsOpen: open })}
          </List>
        </Collapse>
      )}
    </Fragment>
  );
};
