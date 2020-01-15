import React, { useContext, useState } from 'react';
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
import { mdiClose, mdiMagnify, mdiMenu } from '@mdi/js';
import { isNotUndefOrNull } from '@tecsinapse/es-utils/build/object';
import { DefaultProductTypography } from '../DefaultProductTypography';
import { LocaleContext } from '../../LocaleProvider';
import { customAppBarStyle } from '../../ThemeProvider';

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
    color: ({ activeBreadcrumbTextColor }) => {
      return isNotUndefOrNull(activeBreadcrumbTextColor)
        ? activeBreadcrumbTextColor
        : null;
    },
  },
  appBar: {
    display: 'flex',
    flexGrow: 0,
    position: 'unset',
    backgroundColor: ({ appBarBackgroundColor }) => {
      return isNotUndefOrNull(appBarBackgroundColor)
        ? appBarBackgroundColor
        : palette.primary.main;
    },
  },
  breadcrumb: { display: 'flex !important' },
  paperBreadcrumb: {
    display: 'flex',
    height: spacing(3),
    borderTop: '1px solid white',
    paddingLeft: spacing(2),
    paddingRight: spacing(1),
    backgroundColor: ({ breadcrumbBackgroundColor }) => {
      return isNotUndefOrNull(breadcrumbBackgroundColor)
        ? breadcrumbBackgroundColor
        : palette.primary.light;
    },
  },
  link: {
    color: ({ breadcrumbTextColor }) => {
      return isNotUndefOrNull(breadcrumbTextColor)
        ? `${breadcrumbTextColor} !important`
        : `${menuGlobal.breadcrumbContrastText} !important`;
    },
  },
  separator: {
    color: ({ breadcrumbTextColor }) => {
      return isNotUndefOrNull(breadcrumbTextColor)
        ? breadcrumbTextColor
        : menuGlobal.breadcrumbContrastText;
    },
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
  searchMode,
  setSearchMode,
}) => {
  const theme = useTheme();
  const styleProps = customAppBarStyle(theme.variant);
  const classes = useStyles(styleProps);
  const [value, setCustomValue] = useState('');
  const {
    AppBar: { closeSearch, openSearch, openMenu },
  } = useContext(LocaleContext);

  return (
    <div className={className}>
      <MaterialAppBar className={classes.appBar} elevation={0}>
        <Toolbar disableGutters className={classes.toolbar}>
          {searchBar && searchMode ? (
            <>
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
                  aria-label={closeSearch}
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
            </>
          ) : (
            <>
              {menuBar && (
                <IconButton
                  color="inherit"
                  aria-label={openMenu}
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
                  <DefaultProductTypography
                    title={title}
                    subtitle={subtitle}
                    styleProps={styleProps}
                  />
                )}
              </div>

              {rightIcons}

              {searchBar && (
                <IconButton
                  color="inherit"
                  aria-label={openSearch}
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
            </>
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
  breadcrumbs: undefined,
};

AppBar.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  titleComponent: PropTypes.object,
  menuOnClick: PropTypes.func,
  leftIcons: PropTypes.object,
  rightIcons: PropTypes.object,
  /** If component is `a`, you can pass `{ href: URL }` as `componentProps` */
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      componentProps: PropTypes.object,
    })
  ),
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
