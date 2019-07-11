import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import { AppBar as MaterialAppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';

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

export const AppBarSearch = ({ leftIcons, onChange }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [searchMode, setSearchMode] = useState(false);

  return (
    <div className={classes.root}>
      <MaterialAppBar className={classes.appBar} elevation={0}>
        <Toolbar disableGutters className={classes.toolbar}>
          {!searchMode && <div className={classes.leftIcons}>{leftIcons}</div>}

          <IconButton
            color="inherit"
            aria-label="Abrir menu"
            onClick={() => setSearchMode(true)}
            className={classes.marginRightPattern}
          >
            <Icon
              path={mdiMagnify}
              color={theme.palette.primary.contrastText}
              size={1}
            />
          </IconButton>

          {searchMode && (
            <React.Fragment>
              <InputBase
                className={classes.input}
                placeholder="Buscar por nome"
                inputProps={{ 'aria-label': 'Buscar por nome' }}
                autoFocus
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
                  onClick={() => setSearchMode(false)}
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
};

AppBarSearch.propTypes = {
  leftIcons: PropTypes.object,
};
export default AppBarSearch;
