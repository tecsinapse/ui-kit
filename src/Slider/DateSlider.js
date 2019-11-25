// @flow
import React, {useState} from 'react';
import {Slider, useTheme, withStyles} from '@material-ui/core';
import ValueLabel from '@material-ui/core/Slider/ValueLabel';
import locale from 'luxon/src/impl/locale';
import {renderStyledThemeColor} from '../ThemeProvider';

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

type SliderTypes = {
  range: Array<Date>,
  values: Array<Date>,
  onChange: (Array<Date>) => void,
  labelDisplay?: string,
  disabled?: boolean,
  days?: Array<string>,
  locale?: string,
};

export const DateSlider = (props: SliderTypes) => {
  const { variant } = useTheme();
  const {
    range,
    values = [],
    onChange,
    labelDisplay,
    days,
    locale,
    ...rest
  } = props;
  const [dateIndex, setDateIndex] = useState([0, range.length - 1]);

  const handleChange = (ev, newValue) => {
    setDateIndex(newValue);
    onChange([range[dateIndex[0]], range[dateIndex[1]]]);
  };

  const customMarks = range.map((el: Date, index: number): {
    value: number,
    label: string,
  } => {
    return {
      value: index,
      // $FlowFixMe
      label: days[el.getDay()],
    };
  });

  const formatLabel = (value: number, index: number): any => {
    return values && values.length > 0
      ? values[index].toLocaleDateString(locale)
      : onChange([range[0], range[range.length - 1]]);
  };

  return (
    <Slider
      color={renderStyledThemeColor(variant)}
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
      {...rest}
    />
  );
};
DateSlider.defaultProps = {
  disabled: false,
  labelDisplay: 'auto',
  locale: 'pt-BR',
  days: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
};
