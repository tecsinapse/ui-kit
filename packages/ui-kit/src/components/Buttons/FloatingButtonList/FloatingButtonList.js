import React from 'react';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { Collapse } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FloatingButton } from 'components/Buttons';
import { useFloatingButtonListStyles } from './FloatingButtonListStyle';

const style = { marginTop: '6px' };

const FloatingButtonList = ({ items, onClick, open, color }) => {
  const classes = useFloatingButtonListStyles();

  return (
    <div className={classes.root} data-testid="render-floating-button-div">
      {(items || []).map(({ text, component }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Collapse key={index} in={open}>
          <div className={classes.fabItem}>
            {text ? <div className={classes.tooltip}>{text}</div> : null}
            {component}
          </div>
        </Collapse>
      ))}
      <div style={style}>
        <FloatingButton
          data-testid="render-floating-button-list"
          onClick={() => (onClick ? onClick() : null)}
          color={color || null}
          variantFab={color || 'default'}
        >
          <Icon path={mdiPlus} size={1} />
        </FloatingButton>
      </div>
    </div>
  );
};

FloatingButtonList.defaultProps = {
  items: undefined,
  onClick: undefined,
  open: undefined,
};

FloatingButtonList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      component: PropTypes.node,
    })
  ),
  onClick: PropTypes.func,
  open: PropTypes.bool,
};

export { FloatingButtonList };
export default FloatingButtonList;
