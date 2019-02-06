import {FixedSizeList as List} from "react-window";
import React from "react";

const selectMenuHeight = 46;
const optionsShown = 4;

export const MenuListWeb = props => {
  const { options, children, getValue } = props;
  const [value] = getValue();

  const initialOffset = Math.max(options.indexOf(value), 0) * selectMenuHeight;
  const listSize = selectMenuHeight * Math.min(optionsShown, options.length);
  return (
    <List
      height={listSize}
      itemCount={options.length}
      itemSize={selectMenuHeight}
      initialScrollOffset={initialOffset} // TODO: tem alguma coisa errada aqui
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
};
