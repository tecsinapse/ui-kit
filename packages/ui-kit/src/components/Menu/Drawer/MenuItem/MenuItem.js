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

const useStyles = (depth, open) =>
  makeStyles(theme => ({
    listItemText: {
      color: open ? 'white' : 'black',
      marginLeft: 10,
    },

    icon: {
      color: open ? 'white' : theme.palette.primary.main,
    },

    typographyClose: {
      fontSize: 7,
      fontWeight: 'bold',
      color: '#fff',
    },

    pipeIcon: {
      color: open ? 'white' : theme.palette.secondary.main,
    },
    item: {
      width: depth >= 1 ? '90%' : '100%',
      marginLeft: depth >= 1 ? '10%' : '0',
      paddingLeft: depth === 1 ? theme.spacing(0) : theme.spacing(depth * 0.5),

      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        '& $pipeIcon': {
          color: 'white',
        },
        '& $listItemText': {
          color: 'white',
        },
        '& $icon': {
          color: 'white',
        },
      },
    },
    openItem: {
      backgroundColor: open ? theme.palette.primary.main : 'white',
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
  const classes = useStyles(depth, open)(styleProps);

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
