import React, { useState } from 'react';
import { Slider, useTheme, withStyles } from '@material-ui/core';
import ValueLabel from '@material-ui/core/Slider/ValueLabel';
import PropTypes from 'prop-types';
import { renderStyledThemeColor } from '../ThemeProvider';

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
  locale,
  days,
  simple,
  ...props
}) => {
  const { variant } = useTheme();
  const [dateIndex, setDateIndex] = useState(() =>
    simple ? range.length - 1 : [0, range.length - 1]
  );

  const handleChange = (ev, newValue) => {
    setDateIndex(newValue);
    if (simple) {
      onChange([range[0], range[dateIndex]]);
    } else {
      onChange([range[dateIndex[0]], range[dateIndex[1]]]);
    }
  };

  const customMarks = range.map((el, index) => {
    return {
      value: index,
      label: days[el.getDay()],
    };
  });

  const formatLabel = (value, index) => {
    return values && values.length > 0
      ? values[simple ? 1 : index].toLocaleDateString(locale)
      : onChange([range[0], range[range.length - 1]]);
  };

  return (
    <Slider
      color={renderStyledThemeColor(variant)}
      value={dateIndex}
      onChange={handleChange}
      onChangeCommitted={handleChange}
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
  locale: 'pt-BR',
  days: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  simple: false,
};
DateSlider.propTypes = {
  range: PropTypes.arrayOf(PropTypes.Date).isRequired,
  values: PropTypes.arrayOf(PropTypes.Date).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  labelDisplay: PropTypes.string,
  locale: PropTypes.string,
  days: PropTypes.arrayOf(PropTypes.string),
  simple: PropTypes.bool,
};
