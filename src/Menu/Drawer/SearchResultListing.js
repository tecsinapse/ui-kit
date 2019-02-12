import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { List } from '@material-ui/core';
import { TitleSubtitleMenuItem } from './MenuItem';

export const useStyles = makeStyles(theme => ({
  parentList: {
    width: theme.spacing.unit * 25,
  },
}));

export const SearchResultListing = ({ searchResults }) => {
  const classes = useStyles();
  return (
    <List className={classes.parentList}>
      {searchResults.map(({ title, subtitle }) => (
        <TitleSubtitleMenuItem
          key={`${title}${subtitle}`}
          title={title}
          subtitle={subtitle}
        />
      ))}
    </List>
  );
};
