import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import { AppBar as MaterialAppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { mdiChevronRight, mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(({ palette, spacing }) => ({
  toolbar: {
    paddingLeft: spacing.unit,
    paddingRight: spacing.unit,
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    display: 'flex',
    flexGrow: 0,
    position: 'unset',
  },
  breadcrumb: { display: 'flex !important' },
  paperBreadcrumb: {
    display: 'flex',
    height: spacing.unit * 3,
    borderTop: '1px solid white',
    paddingLeft: spacing.unit,
    paddingRight: spacing.unit,
    backgroundColor: palette.primary.light,
  },
  link: {
    color: `${palette.common.white} !important`,
  },
}));

export const AppBar = ({
  title,
  menuOnClick,
  renderLeftIcons,
  renderRightIcons,
}) => {
  const classes = useStyles();
  return (
    <div>
      <MaterialAppBar className={classes.appBar}>
        <Toolbar disableGutters className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="Abrir menu"
            onClick={menuOnClick}
          >
            <Icon path={mdiMenu} color="white" size={1} />
          </IconButton>
          {renderLeftIcons && renderLeftIcons()}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {title}
          </Typography>
          {renderRightIcons && renderRightIcons()}
        </Toolbar>
        <div className={classes.paperBreadcrumb}>
          <Breadcrumbs
            classes={{ root: classes.breadcrumb }}
            separator={<Icon path={mdiChevronRight} color="white" size={1} />}
            arial-label="Breadcrumb"
          >
            <Link
              href="/"
              component="a"
              variant="subtitle2"
              classes={{ root: classes.link }}
            >
              Portal
            </Link>
            <Link
              href="/"
              component="a"
              variant="subtitle2"
              classes={{ root: classes.link }}
            >
              CRM
            </Link>
            <Typography color="textPrimary" variant="subtitle2">
              #1234
            </Typography>
          </Breadcrumbs>
        </div>
      </MaterialAppBar>
    </div>
  );
};
export default AppBar;
