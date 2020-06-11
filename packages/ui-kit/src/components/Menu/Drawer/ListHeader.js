import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import clsx from 'clsx';

import SearchBar from 'material-ui-search-bar';
import { grey } from '@material-ui/core/colors';
import { DefaultProductTypography } from '../DefaultProductTypography';

const useStyles = makeStyles(({ spacing }) => ({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  noPadding: {
    padding: '0px !important',
  },
  searchBar: {
    flexGrow: '1',
    boxShadow: 'none !important',
    width: '100%',
    height: spacing(5),
    borderRadius: 0,
    backgroundColor: grey[100],
    paddingTop: spacing(0.5),
    paddingBottom: spacing(0.5),
  },
}));

export const ListHeader = ({
  search,
  setSearch,
  title,
  subtitle,
  productName,
  searchBarPlaceholder = 'O que você busca?',
}) => {
  const classes = useStyles();
  return (
    <>
      <ListItem alignItems="flex-start" divider className={classes.flexColumn}>
        <DefaultProductTypography title={title} subtitle={subtitle} />
        <ListItemText className={classes.noPadding} secondary={productName} />
      </ListItem>
      <ListItem
        alignItems="flex-start"
        divider
        className={clsx(classes.flexColumn, classes.noPadding)}
      >
        <SearchBar
          placeholder={searchBarPlaceholder}
          className={classes.searchBar}
          value={search}
          onChange={setSearch}
          onCancelSearch={() => setSearch('')}
        />
      </ListItem>
    </>
  );
};
