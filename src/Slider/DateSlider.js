import React, { useState } from 'react';
import { Slider, useTheme, withStyles } from '@material-ui/core';
import ValueLabel from '@material-ui/core/Slider/ValueLabel';
import PropTypes from 'prop-types';
import { getDayName } from './dateUtils';

const StyledValueLabel = withStyles({
  offset: {
    left: 'calc(-50% + -40px)',
  },
  circle: {
    width: '100%',
    borderRadius: '5%',
    transform: 'none',
    margin: '0px 10px 10px 10px',
  },
  label: {
    transform: 'none',
  },
})(ValueLabel);

export const DateSlider = ({
  range,
  values = [],
  onChange,
  labelDisplay,
  ...props
}) => {
  const [dateIndex, setDateIndex] = useState([0, range.length - 1]);
  const handleChange = (ev, newValue) => {
    setDateIndex(newValue);
    onChange([range[dateIndex[0]], range[dateIndex[1]]]);
  };

  const customMarks = range.map((el, index) => {
    return {
      value: index,
      label: getDayName(el.getDay()),
    };
  });

  const formatLabel = (value, index) => {
    return values && values.length > 0
      ? values[index].toLocaleDateString('pt-BR')
      : onChange([range[0], range[range.length - 1]]);
  };

  const { variant } = useTheme();
  return (
    <Slider
      color={variant === 'yellow' ? 'secondary' : 'primary'}
      value={dateIndex}
      onChange={handleChange}
      valueLabelFormat={formatLabel}
      ValueLabelComponent={StyledValueLabel}
      aria-labelledby="range-slider"
      valueLabelDisplay={labelDisplay}
      min={0}
      step={1}
      max={range.length - 1}
      marks={customMarks}
      {...props}
    />
  );
};
DateSlider.defaultProps = {
  disabled: false,
  labelDisplay: 'auto',
};
DateSlider.propTypes = {
  range: PropTypes.arrayOf(PropTypes.Date).isRequired,
  values: PropTypes.arrayOf(PropTypes.Date).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  labelDisplay: PropTypes.string,
};
