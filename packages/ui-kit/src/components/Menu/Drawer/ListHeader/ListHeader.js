import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { Avatar } from '@material-ui/core';
import clsx from 'clsx';
import SearchBar from 'material-ui-search-bar';
import { grey } from '@material-ui/core/colors';
import { DefaultProductTypography } from 'components/Menu/Drawer/DefaultProductTypography';

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
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    border: `3px solid ${grey[300]}`,
  },
  logo: {
    width: ({ width }) => width,
    height: ({ height }) => height,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export const ListHeader = ({
  srcAvatar,
  srcLogo,
  width = 130,
  height = 60,
  search,
  setSearch,
  title,
  subtitle,
  productName,
  searchBarPlaceholder = 'O que você busca?',
}) => {
  const classes = useStyles({ width, height });

  return (
    <>
      <ListItem alignItems="flex-start" divider className={classes.listItem}>
        <div className={classes.flexColumn}>
          {((title || subtitle || productName) && srcLogo) || srcLogo ? (
            <>
              <img src={srcLogo} className={classes.logo} alt="Logo" />
              <DefaultProductTypography title={title} subtitle={subtitle} />
              <ListItemText
                className={classes.noPadding}
                secondary={productName}
              />
            </>
          ) : (
            <>
              <DefaultProductTypography title={title} subtitle={subtitle} />
              <ListItemText
                className={classes.noPadding}
                secondary={productName}
              />
            </>
          )}
        </div>
        <Avatar src={srcAvatar} className={classes.avatar} />
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
