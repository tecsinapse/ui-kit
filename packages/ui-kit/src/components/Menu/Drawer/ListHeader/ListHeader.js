import React from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { Avatar } from '@material-ui/core';
import clsx from 'clsx';
import SearchBar from 'material-ui-search-bar';
import { grey } from '@material-ui/core/colors';
import { DefaultProductTypography } from 'components/Menu/Drawer/DefaultProductTypography';
import { customAppBarStyle } from '../../../../themes';

const useStyles = makeStyles(({ spacing, palette, variant }) => ({
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
    paddingTop: ({ paddingTop }) => paddingTop,
    width: ({ width }) => width,
    height: ({ height }) => height,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: variant === 'bajaj' ? palette.primary.main : 'white',
  },
}));

export const ListHeader = ({
  userName,
  srcAvatar,
  logoProps = {},
  search,
  setSearch,
  title,
  subtitle,
  productName,
  searchBarPlaceholder = 'O que você busca?',
}) => {
  const { width, height, paddingTop = 0 } = logoProps;
  const classes = useStyles({ width, height, paddingTop });
  const theme = useTheme();
  const styleProps = customAppBarStyle(theme.variant);

  return (
    <>
      <ListItem alignItems="flex-start" divider className={classes.listItem}>
        <div className={classes.flexColumn}>
          {((title || subtitle || productName) && logoProps?.src) ||
          logoProps?.src ? (
            <>
              <img src={logoProps.src} className={classes.logo} alt="Logo" />
              {theme.variant === 'bajaj' ? (
                <DefaultProductTypography
                  title={title}
                  subtitle={subtitle}
                  styleProps={styleProps}
                />
              ) : (
                <DefaultProductTypography title={title} subtitle={subtitle} />
              )}
              <ListItemText
                className={classes.noPadding}
                secondary={productName}
              />
            </>
          ) : (
            <>
              {theme.variant === 'bajaj' ? (
                <DefaultProductTypography
                  title={title}
                  subtitle={subtitle}
                  styleProps={styleProps}
                />
              ) : (
                <DefaultProductTypography title={title} subtitle={subtitle} />
              )}
              <ListItemText
                className={classes.noPadding}
                secondary={productName}
              />
            </>
          )}
        </div>
        {srcAvatar ? (
          <Avatar src={srcAvatar} className={classes.avatar} />
        ) : (
          <Avatar className={classes.avatar}>
            {userName?.charAt(0) || ''}
          </Avatar>
        )}
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
