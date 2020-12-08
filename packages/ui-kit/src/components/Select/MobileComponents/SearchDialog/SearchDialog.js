import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import Search from '@material-ui/icons/Search';
import SearchBar from 'material-ui-search-bar';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';

const typeStyles = {
  container: {
    display: 'flex' /* establish flex container */,
    flexGrow: 1,
    flexDirection: 'column' /* make main axis vertical */,
    justifyContent: 'center' /* center items vertically, in this case */,
    alignItems: 'center' /* center items horizontally, in this case */,
    marginTop: '60px',
  },
  item: {
    textAlign: 'center',
  },
};

const tabStyles = theme => ({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
  },
  helper: {},
  searchBar: {
    flexGrow: '1',
    paddingRight: 0,
    boxShadow: 'none !important',
    width: '100%',
    height: 'unset',
  },
  searchBarContainer: {
    marginRight: 0,
    paddingRight: 0,
  },
  expansionPanelDetails: {
    flexDirection: 'column',
    borderTop: 'solid 1px rgba(0,0,0,0.1)',
    paddingTop: '20px',
  },
  expasionPanelSummary: {
    display: 'flex',
    padding: '0',
  },
  buttonFilter: {},
  buttonFilterExpanded: {
    marginRight: '16px',
  },
  expandIcon: {
    transition: 'none',
    marginRight: '-8px',
  },
  noPaddingRight: {
    paddingRight: '0 !important',
  },
});

export const NoItemsSearchDialog = withStyles(typeStyles)(
  ({
    classes,
    itemPlaceHolder = 'Nenhum item encontrado com esses critérios.',
  }) => (
    <div className={classes.container}>
      <div className={classes.item}>
        <p>
          <Search /> {itemPlaceHolder}
        </p>
      </div>
    </div>
  )
);

const style = { height: '100%' };
const style1 = { marginLeft: '5px' };
const useSearchDialogStyles = makeStyles(tabStyles);

export const SearchTextContext = React.createContext(null);

export const SearchDialog = ({
  children,
  label,
  setMenuIsOpen,
  selectPromptMessage,
}) => {
  const [textSearch, setTextSearch] = useState('');
  const classes = useSearchDialogStyles();

  const onClick = () => setMenuIsOpen(false);

  return (
    <Dialog fullScreen onClose={onClick} open disableEscapeKeyDown>
      <Paper className={classes.flex}>
        <IconButton style={style1} onClick={onClick}>
          <ArrowBackIos color="inherit" />
        </IconButton>

        <SearchBar
          classes={{
            root: [classes.searchBar, classes.noPaddingRight].join(' '),
            searchContainer: classes.searchBarContainer,
          }}
          placeholder={`${selectPromptMessage}: ${label}...`}
          value={textSearch}
          onCancelSearch={() => setTextSearch('')}
          onChange={newValue => setTextSearch(newValue)}
        />
      </Paper>
      <div style={style}>
        <SearchTextContext.Provider value={textSearch}>
          {children}
        </SearchTextContext.Provider>
      </div>
    </Dialog>
  );
};
