import React, { useContext } from 'react';
import { List as MuiList } from '@material-ui/core';
import {
  NoItemsSearchDialog,
  SearchTextContext,
} from 'components/Select/MobileComponents/SearchDialog';

export const MenuList = props => {
  let { options, children } = props;
  let searchText = useContext(SearchTextContext);

  if (searchText) {
    searchText = searchText.toLowerCase();
    options = options.filter(
      o => o.label.toLowerCase().indexOf(searchText) > -1
    );
    children = React.Children.map(children, child => {
      if (child.props.children.toLowerCase().indexOf(searchText) > -1) {
        return child;
      }

      return null;
    }).filter(b => b);

    if (options.length === 0) {
      return <NoItemsSearchDialog />;
    }
  }

  const listStyle = {
    padding: 0,
  };

  return <MuiList style={listStyle}>{(children || []).map(i => i)}</MuiList>;
};
