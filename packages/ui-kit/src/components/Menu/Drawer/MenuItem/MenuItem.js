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
import Typography from '@material-ui/core/Typography';

const useStyles = (depth, open, selected) =>
  makeStyles(theme => ({
    listItemText: {
      color: open || selected ? 'white' : 'black',
      marginLeft: 10,
    },

    icon: {
      color: open ? 'white' : '#616161',
    },

    typographyClose: {
      fontSize: 7,
      fontWeight: 'bold',
      color: '#fff',
    },

    pipeIcon: {
      color: open || selected ? 'white' : '#89898A',
    },
    item: {
      width: depth >= 1 ? '90%' : '100%',
      marginLeft: depth >= 1 ? '10%' : '0',
      paddingLeft: depth === 1 ? theme.spacing(0) : theme.spacing(depth * 0.5),
      borderBottom: depth > 0 ? '1px solid rgba(0, 0, 0, 0.12)' : '',

      '&:hover': {
        backgroundColor: open || selected ? '#1f1f1f' : '#E0E0E0',
      },
    },
    openItemDepth0: {
      backgroundColor: open ? '#89898A' : 'white',
    },
    openItemDepth1: {
      backgroundColor: open ? '#666666' : 'white',
    },
    openItemDepth2: {
      backgroundColor: open ? '#4C4C4D' : 'white',
    },
    selected: {
      backgroundColor: 'black',
    },
    shadow: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    },
    isSub: {
      backgroundColor: grey[200],
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
  const classes = useStyles(depth, open, selected)(styleProps);

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
          [classes.openItemDepth0]: (open && depth === 0) || showAsOpen,
          [classes.openItemDepth1]: open && depth === 1,
          [classes.openItemDepth2]: open && depth >= 2,
          [classes.item]: true,
          [classes.selected]: selected,
          [classes.isSub]: depth > 1 && !open,
        })}
        onClick={() => handleClick(title)}
        {...componentProps}
      >
        <Typography variant="subtitle2" className={classes.pipeIcon}>
          {'|'.repeat(depth)}
        </Typography>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary={title}
          primaryTypographyProps={{
            variant: 'subtitle2',
            color: selected ? 'secondary' : 'textPrimary',
          }}
        />
        {children && (
          <>
            {open ? (
              <>
                <Typography className={classes.typographyClose} variant="h5">
                  FECHAR
                </Typography>
                <Icon path={mdiMenuUp} className={classes.icon} size={1} />
              </>
            ) : (
              <Icon path={mdiMenuDown} className={classes.icon} size={1} />
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
