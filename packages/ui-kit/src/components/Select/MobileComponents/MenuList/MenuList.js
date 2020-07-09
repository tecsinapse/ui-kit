import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { List } from 'react-virtualized';
import React, { useContext } from 'react';
import {
  NoItemsSearchDialog,
  SearchTextContext,
} from '../SearchDialog/SearchDialog';

const selectMenuHeight = 50;

function rowRenderer({
  key, // Unique key within array of rows
  index, // Index of row within collection
  isScrolling, // The List is currently being scrolled
  isVisible, // This row is visible within the List (eg it is not an overscanned row)
  style, // Style object to be applied to row (to position it)
  parent,
}) {
  return (
    <div key={key} style={style}>
      {parent.props.childrens[index]}
    </div>
  );
}

export const MenuList = props => {
  const { getValue } = props;
  let { options, children } = props;
  const [value] = getValue();
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

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          width={width}
          rowCount={options.length}
          rowHeight={selectMenuHeight}
          rowRenderer={rowRenderer}
          childrens={children}
          scrollToIndex={Math.max(options.indexOf(value), 0)}
        />
      )}
    </AutoSizer>
  );
};
