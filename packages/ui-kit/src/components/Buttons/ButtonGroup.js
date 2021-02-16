import { makeStyles } from '@material-ui/core';
import { Button } from '@tecsinapse/ui-kit';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  buttonsHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: ({ width }) => width,
    height: ({ height }) => height,
  },
  buttonsVertical: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: ({ width }) => width,
    height: ({ height }) => height,
  },
}));

export const ButtonGroup = ({
  labels,
  orientation,
  multiselect,
  fullWidth,
  size,
  color,
  classesName,
  width,
  height,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(
    labels
      .map(({ active }, index) => (active ? index : -1))
      .filter(item => item >= 0)
  );
  const classes = useStyles({ width, height });

  const handleClick = (e, idx, onClick) => {
    if (!multiselect) {
      if (activeIndex[0] === idx) {
        setActiveIndex([]);
      } else {
        setActiveIndex([idx]);
      }
    } else if (activeIndex.length === 0) {
      setActiveIndex([idx]);
    } else if (activeIndex.includes(idx)) {
      const aux = [...activeIndex];
      const indexAux = activeIndex.indexOf(idx);

      aux.splice(indexAux, 1);
      setActiveIndex([...aux]);
    } else {
      setActiveIndex([...activeIndex, idx]);
    }
    onClick(e);
  };

  return (
    <div
      className={clsx(
        orientation === 'vertical'
          ? classes.buttonsVertical
          : classes.buttonsHorizontal,
        classesName
      )}
    >
      {labels.map(({ label, onClick }, idx) => {
        let variant;

        if (!multiselect) {
          variant = activeIndex[0] === idx ? 'contained' : 'outlined';
        } else {
          const indexAux = activeIndex.indexOf(idx);

          variant = activeIndex[indexAux] === idx ? 'contained' : 'outlined';
        }

        return (
          <Button
            key={label}
            fullWidth={fullWidth}
            size={size}
            variant={variant}
            color={color}
            onClick={e => {
              handleClick(e, idx, onClick);
            }}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};

ButtonGroup.defaultProps = {
  multiselect: true,
  orientation: 'horizontal',
  size: 'medium',
  fullWidth: false,
  labels: [],
  color: 'primary',
  classesName: '',
  width: 'auto',
  height: 'auto',
};

ButtonGroup.propTypes = {
  /** Button size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** orientation button */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Button multi-selectable */
  multiselect: PropTypes.bool,
  /** Button fill div/screen width */
  fullWidth: PropTypes.bool,
  /** color button */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /** labels of buttons to be render */
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      onClick: PropTypes.func,
      active: PropTypes.bool,
    })
  ),
  /** compiled classes passed to main div */
  classesName: PropTypes.string,
  /** button container width */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** button container height */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ButtonGroup;
