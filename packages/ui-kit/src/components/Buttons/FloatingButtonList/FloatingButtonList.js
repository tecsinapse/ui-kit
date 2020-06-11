import React from 'react';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { Collapse } from '@material-ui/core';
import { useFloatingButtonListStyles } from './FloatingButtonListStyle';
import { FloatingButton } from '../FloatingButton';

const FloatingButtonList = ({ items, onClick, open, color }) => {
  const classes = useFloatingButtonListStyles();

  return (
    <div className={classes.root}>
      {(items || []).map(({ text, component }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Collapse key={index} in={open}>
          <div className={classes.fabItem}>
            {text ? <div className={classes.tooltip}>{text}</div> : null}
            {component}
          </div>
        </Collapse>
      ))}
      <div>
        <FloatingButton
          onClick={() => (onClick ? onClick() : null)}
          color={color || null}
        >
          <Icon path={mdiPlus} size={1} />
        </FloatingButton>
      </div>
    </div>
  );
};

export { FloatingButtonList };
