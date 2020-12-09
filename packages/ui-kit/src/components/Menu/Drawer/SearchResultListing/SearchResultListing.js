import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { List } from '@material-ui/core';
import { TitleSubtitleMenuItem } from 'components/Menu/Drawer/MenuItem';

export const useStyles = makeStyles(theme => ({
  parentList: {
    width: theme.spacing(25),
  },
}));

export const SearchResultListing = ({ searchResults, onClick }) => {
  const classes = useStyles();

  return (
    <List className={classes.parentList}>
      {searchResults.map(({ title, subtitle, component, componentProps }) => (
        <TitleSubtitleMenuItem
          key={`${title}${subtitle}`}
          title={title}
          subtitle={subtitle}
          onClick={onClick}
          component={component}
          {...componentProps}
        />
      ))}
    </List>
  );
};
