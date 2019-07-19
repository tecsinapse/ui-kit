import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { AppBar as MaterialAppBar, CircularProgress } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { mdiMenu } from '@mdi/js';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import Icon from '@mdi/react';
import Link from '@material-ui/core/Link';
import { DefaultProductTypography } from '../DefaultProductTypography';

const useStyles = makeStyles(({ palette, spacing, menuGlobal }) => ({
  marginLeft: {
    marginLeft: `${spacing(0.5)}px !important`,
  },
  toolbar: {
    paddingLeft: spacing(1),
    paddingRight: spacing(1),
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: spacing(1),
  },
  boldFont: {
    fontWeight: 700,
  },
  appBar: {
    display: 'flex',
    flexGrow: 0,
    position: 'unset',
    backgroundColor: palette.primary.main,
  },
  breadcrumb: { display: 'flex !important' },
  paperBreadcrumb: {
    display: 'flex',
    height: spacing(3),
    borderTop: '1px solid white',
    paddingLeft: spacing(2),
    paddingRight: spacing(1),
    backgroundColor: palette.primary.light,
  },
  link: {
    color: `${menuGlobal.breadcrumbContrastText} !important`,
  },
  separator: {
    color: menuGlobal.breadcrumbContrastText,
  },
  marginRightPattern: {
    marginRight: spacing(1),
  },
}));

export const AppBar = ({
  title,
  subtitle,
  titleComponent = null,
  menuOnClick,
  leftIcons,
  rightIcons,
  className,
  breadcrumbs = [],
  loadingBreadcrumbs = false,
  disableBreadcrumb,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={className}>
      <MaterialAppBar className={classes.appBar} elevation={0}>
        <Toolbar disableGutters className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="Abrir menu"
            onClick={menuOnClick}
            className={classes.marginRightPattern}
          >
            <Icon
              path={mdiMenu}
              color={theme.palette.primary.contrastText}
              size={1}
            />
          </IconButton>
          {leftIcons}
          <div className={classes.grow}>
            {titleComponent ? (
              { titleComponent }
            ) : (
              <DefaultProductTypography title={title} subtitle={subtitle} />
            )}
          </div>
          {rightIcons}
        </Toolbar>
        {!disableBreadcrumb && (
          <div className={classes.paperBreadcrumb}>
            {loadingBreadcrumbs ? (
              <CircularProgress size={10} />
            ) : (
              <Breadcrumbs
                classes={{ root: classes.breadcrumb }}
                separator={
                  <NavigateNextIcon
                    fontSize="small"
                    className={classes.separator}
                  />
                }
                arial-label="Breadcrumb"
              >
                {breadcrumbs.map((current, index, arr) =>
                  index === arr.length - 1 ? (
                    <Typography
                      key={current.title}
                      color="secondary"
                      className={classes.boldFont}
                      variant="subtitle2"
                    >
                      {current.title}
                    </Typography>
                  ) : (
                    <Link
                      key={current.title}
                      component={current.component}
                      variant="subtitle2"
                      classes={{ root: classes.link }}
                      {...current.componentProps}
                    >
                      {current.title}
                    </Link>
                  )
                )}
              </Breadcrumbs>
            )}
          </div>
        )}
      </MaterialAppBar>
    </div>
  );
};

AppBar.defaultProps = {
  title: '',
  subtitle: '',
  titleComponent: null,
  menuOnClick: null,
  leftIcons: null,
  rightIcons: null,
  disableBreadcrumb: false,
  loadingBreadcrumbs: false,
};
export const breadcrumb = PropTypes.shape({
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  component: PropTypes.function,
  componentProps: PropTypes.object,
});

AppBar.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  titleComponent: PropTypes.object,
  menuOnClick: PropTypes.func,
  leftIcons: PropTypes.object,
  rightIcons: PropTypes.object,
  breadcrumbs: PropTypes.arrayOf(breadcrumb).isRequired,
  loadingBreadcrumbs: PropTypes.bool,
  disableBreadcrumb: PropTypes.bool,
};
export default AppBar;
