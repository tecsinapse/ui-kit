import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import { AppBar as MaterialAppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

import { mdiMagnify, mdiFilterVariant, mdiClose } from '@mdi/js';

import Icon from '@mdi/react';

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
  marginRightPattern: {
    marginRight: spacing(1),
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  leftIcons: {
    flexGrow: 1,
  },
  root: {
    width: '100vw',
  },
}));

export const AppBarSearch = ({
  leftIcons,
  onChange,
  onRequestSearch,
  onSearchMode,
  onCancelSearchMode,
  placeholder,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [searchMode, setSearchMode] = useState(false);
  const [value, setCustomValue] = useState();

  return (
    <div className={classes.root}>
      <MaterialAppBar className={classes.appBar} elevation={0}>
        <Toolbar disableGutters className={classes.toolbar}>
          {!searchMode ? (
            <React.Fragment>
              <div className={classes.leftIcons}>{leftIcons}</div>

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
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Icon
                path={mdiMagnify}
                color={theme.palette.primary.contrastText}
                size={1}
              />

              <Input
                className={classes.input}
                placeholder={placeholder}
                inputProps={{ 'aria-label': placeholder }}
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
          )}
        </Toolbar>
      </MaterialAppBar>
    </div>
  );
};

AppBarSearch.defaultProps = {
  leftIcons: null,
  onChange: undefined,
  onRequestSearch: undefined,
  onSearchMode: undefined,
  onCancelSearchMode: undefined,
  placeholder: 'Buscar por nome',
};

AppBarSearch.propTypes = {
  leftIcons: PropTypes.object,
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
export default AppBarSearch;
