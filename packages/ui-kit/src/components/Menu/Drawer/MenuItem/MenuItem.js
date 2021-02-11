import React, { cloneElement, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { mdiMenuDown, mdiMenuUp } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import { grey } from '@material-ui/core/colors';
import { isNotUndefOrNull } from '@tecsinapse/es-utils/build/object';
import Typography from '@material-ui/core/Typography';

const useStyles = (depth, children, open) =>
  makeStyles(theme => ({
    listItemText: {
      color: open ? 'white' : 'black',
      marginLeft: 10,
    },

    typographyClose: {
      fontSize: 7,
      fontWeight: 'bold',
      color: '#fff',
    },

    pipeIcon: {
      color: '#f99f1f',
      fontWeight: 'bold',
    },
    item: {
      paddingLeft:
        depth >= 1
          ? theme.spacing((depth + 1) * 1.25)
          : theme.spacing(depth + 1),
      '&:hover': {
        backgroundColor: '#F29A1E',
        '& $pipeIcon': {
          color: '#fff',
        },
        '& $listItemText': {
          color: '#fff',
        },
      },
    },
    openItem: {
      backgroundColor: children && open ? '#78787A' : '#F0F0F0',
    },
    selected: {
      backgroundColor: ({ selectedBackgroundColor }) =>
        isNotUndefOrNull(selectedBackgroundColor)
          ? selectedBackgroundColor
          : grey[200],
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
  <ListItem button divider onClick={onClick} component={component} {...props}>
    <ListItemText
      primary={title}
      secondary={subtitle}
      primaryTypographyProps={{ variant: 'subtitle2' }}
    />
  </ListItem>
);

const CollapsedList = ({ childrenBack, open }) => {
  const listRef = useRef(null);

  useEffect(() => listRef.current.scrollIntoView(true), []);

  return (
    <List component="div" disablePadding dense ref={listRef}>
      {cloneElement(childrenBack, { showAsOpen: open })}
    </List>
  );
};

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
  const classes = useStyles(depth, children, open)(styleProps);

  return (
    <div
      className={clsx({
        [classes.shadow]: depth === 0 && open,
      })}
    >
      <ListItem
        button
        component={component}
        divider={depth === 0}
        className={clsx({
          [classes.openItem]: open || showAsOpen,
          [classes.item]: true,
          [classes.selected]: selected,
        })}
        onClick={() => handleClick(title)}
        {...componentProps}
      >
        <Typography variant="caption" className={classes.pipeIcon}>
          {'|'.repeat(depth + 1)}
        </Typography>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary={title}
          primaryTypographyProps={{
            variant: 'subtitle2',
            color: selected ? 'secondary' : 'textPrimary',
            colorTextPrimary: '#132',
          }}
        />
        {children && (
          <>
            {open ? (
              <>
                <Typography className={classes.typographyClose} variant="h5">
                  FECHAR
                </Typography>
                <Icon
                  path={mdiMenuUp}
                  className={classes.icon}
                  color="#fff"
                  size={1}
                />
              </>
            ) : (
              <Icon path={mdiMenuDown} color="#949494" size={1} />
            )}
          </>
        )}
      </ListItem>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <CollapsedList childrenBack={children} open={open} />
        </Collapse>
      )}
    </div>
  );
};
