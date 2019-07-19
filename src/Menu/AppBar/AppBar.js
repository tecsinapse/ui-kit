import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { AppBar as MaterialAppBar, CircularProgress } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Icon from '@mdi/react';
import Link from '@material-ui/core/Link';
import Input from '@material-ui/core/Input';
import { mdiMagnify, mdiFilterVariant, mdiClose, mdiMenu } from '@mdi/js';
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
  input: {
    marginLeft: spacing(1),
    flex: 1,
  },
  inputColor: {
    color: palette.primary.contrastText,
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
  onChange,
  onRequestSearch,
  onSearchMode,
  onCancelSearchMode,
  placeholder,
  searchBar,
  menuBar,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [searchMode, setSearchMode] = useState(false);
  const [value, setCustomValue] = useState('');

  return (
    <div className={className}>
      <MaterialAppBar className={classes.appBar} elevation={0}>
        <Toolbar disableGutters className={classes.toolbar}>
          {searchBar && searchMode ? (
            <React.Fragment>
              <Icon
                path={mdiMagnify}
                color={theme.palette.primary.contrastText}
                size={1}
              />

              <Input
                className={classes.input}
                placeholder={placeholder}
                inputProps={{
                  'aria-label': placeholder,
                  className: classes.inputColor,
                }}
                value={value}
                onChange={e => {
                  setCustomValue(e.target.value);
                  if (onChange) {
                    onChange(e.target.value);
                  }
                }}
                onKeyUp={e => {
                  if (
                    (e.charCode === 13 || e.key === 'Enter') &&
                    onRequestSearch
                  ) {
                    onRequestSearch(value);
                  }
                }}
                autoFocus
                disableUnderline
              />
              <div className={classes.searchRightIcons}>
                <IconButton
                  color="inherit"
                  aria-label="Filtros"
                  onClick={() => {}}
                  className={classes.filters}
                >
                  <Icon
                    path={mdiFilterVariant}
                    color={theme.palette.primary.contrastText}
                    size={1}
                  />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="Close search"
                  onClick={() => {
                    setSearchMode(false);
                    setCustomValue('');
                    if (onCancelSearchMode) {
                      onCancelSearchMode();
                    }
                  }}
                  className={classes.filters}
                >
                  <Icon
                    path={mdiClose}
                    color={theme.palette.primary.contrastText}
                    size={1}
                  />
                </IconButton>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {menuBar && (
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
              )}

              {leftIcons}

              <div className={classes.grow}>
                {titleComponent ? (
                  { titleComponent }
                ) : (
                  <DefaultProductTypography title={title} subtitle={subtitle} />
                )}
              </div>

              {rightIcons}

              {searchBar && (
                <IconButton
                  color="inherit"
                  aria-label="Abrir menu"
                  onClick={() => {
                    setSearchMode(true);
                    if (onSearchMode) {
                      onSearchMode();
                    }
                  }}
                  className={classes.marginRightPattern}
                >
                  <Icon
                    path={mdiMagnify}
                    color={theme.palette.primary.contrastText}
                    size={1}
                  />
                </IconButton>
              )}
            </React.Fragment>
          )}
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
  onChange: undefined,
  onRequestSearch: undefined,
  onSearchMode: undefined,
  onCancelSearchMode: undefined,
  placeholder: 'Buscar por nome',
  searchBar: false,
  menuBar: true,
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
  searchBar: PropTypes.bool,
  menuBar: PropTypes.bool,
  /** Fired when the text value changes. */
  onChange: PropTypes.func,
  /** Fired when the search icon is clicked. */
  onRequestSearch: PropTypes.func,
  /** Sets placeholder text for the embedded text field. */
  placeholder: PropTypes.string,
  /** Fired when the bar enters in the search mdoe */
  onSearchMode: PropTypes.func,
  /** Fired when the bar leaves the search mode */
  onCancelSearchMode: PropTypes.func,
};
export default AppBar;
