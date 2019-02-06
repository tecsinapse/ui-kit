import Paper from "@material-ui/core/Paper";
import React from "react";


export const MenuWeb = ({ menuPlacement, theme, selectProps, innerProps, children }) => {
  const style = {
    ...(menuPlacement === 'bottom'
      ? { marginTop: theme.spacing.unit }
      : { bottom: 35 }),
    zIndex: 999999,
    overflow: 'visible',
  };
  return (
    <Paper
      square
      className={selectProps.childrenClasses.paper}
      style={style}
      {...innerProps}
    >
      {children}
    </Paper>
  );
};
