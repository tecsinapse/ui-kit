/* eslint-disable react/jsx-props-no-spreading */
import React, { cloneElement } from 'react';
import { makeStyles } from '@material-ui/styles';
import { mdiMenuDown, mdiMenuUp } from '@mdi/js';
import Icon from '@mdi/react';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import { grey } from '@material-ui/core/colors';
import { isNotUndefOrNull } from '@tecsinapse/es-utils/build/object';

const useStyles = depth =>
  makeStyles(theme => ({
    item: {
      paddingLeft:
        depth >= 1
          ? theme.spacing((depth + 1) * 1.25)
          : theme.spacing(depth + 1),
    },
    parentItem: {
      height: theme.spacing(5),
    },
    childItem: {
      height: theme.spacing(3),
    },
    openItem: {
      backgroundColor: grey[Math.min(Math.max(1, depth) * 50, 100)],
    },
    selected: {
      backgroundColor: ({ selectedBackgroundColor }) => {
        return isNotUndefOrNull(selectedBackgroundColor)
          ? selectedBackgroundColor
          : grey[200];
      },
    },
    shadow: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    },
  }));
export const TitleSubtitleMenuItem = ({
  title,
  subtitle,
  onClick,
  component,
  ...props
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ListItem button divider onClick={onClick} component={component} {...props}>
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
  styleProps,
}) => {
  const classes = useStyles(depth)(styleProps);
  return (
    <div
      className={classNames({
        [classes.shadow]: depth === 0 && open,
      })}
    >
      <ListItem
        button
        component={component}
        divider={depth === 0}
        className={classNames({
          [classes.openItem]: open || showAsOpen,
          [classes.parentItem]: depth === 0,
          [classes.childItem]: depth > 0,
          [classes.item]: true,
          [classes.selected]: selected,
        })}
        onClick={() => handleClick(title)}
        {...componentProps}
      >
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            variant: 'subtitle2',
            color: selected ? 'secondary' : 'textPrimary',
          }}
        />
        {children && (
          <>
            {open ? (
              <Icon path={mdiMenuUp} color="gray" size={1} />
            ) : (
              <Icon path={mdiMenuDown} color="gray" size={1} />
            )}
          </>
        )}
      </ListItem>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            {cloneElement(children, { showAsOpen: open })}
          </List>
        </Collapse>
      )}
    </div>
  );
};
