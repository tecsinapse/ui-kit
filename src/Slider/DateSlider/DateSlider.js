import React, { useState } from 'react';
import { Slider, useTheme, withStyles } from '@material-ui/core';
import ValueLabel from '@material-ui/core/Slider/ValueLabel';
import PropTypes from 'prop-types';
import { renderStyledColor } from '../../ThemeProvider';

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
    color: '#FFF',
  },
})(ValueLabel);

const DateSlider = ({
  range,
  values = [],
  onChangeFunction,
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
      onChangeFunction([range[0], range[dateIndex]]);
    } else {
      onChangeFunction([range[dateIndex[0]], range[dateIndex[1]]]);
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
      : onChangeFunction([range[0], range[range.length - 1]]);
  };

  return (
    <Slider
      color={renderStyledColor(variant)}
      value={dateIndex}
      onChangeFunction={handleChange}
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
  /** Range of dates to be displayed */
  range: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  /** Values to be changed or initial value */
  values: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  /** Function triggered on slider change */
  onChangeFunction: PropTypes.func.isRequired,
  /** Disables the slider */
  disabled: PropTypes.bool,
  /** Label display mode */
  labelDisplay: PropTypes.oneOf(['auto', 'on', 'off']),
  /** Language code for date conversion */
  locale: PropTypes.string,
  /** Array of week days from Sun to Sat */
  days: PropTypes.arrayOf(PropTypes.string),
  /** Change slider from interval to single */
  simple: PropTypes.bool,
};

export { DateSlider };
