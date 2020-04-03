import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

/*
 * Based on PrettoSlider at materia-ui
 * https://github.com/mui-org/material-ui/blob/master/docs/src/pages/components/slider/CustomizedSlider.tsx
 * */
const ValueSlider = props => {
  const Component = withStyles(theme => ({
    root: {
      marginTop: `-${theme.spacing(1)}px`,
      color: props && props.colorSlider,
    },
    thumb: {
      display: 'none',
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
    mark: {
      display: 'none',
    },
    markLabel: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontStretch: 'normal',
      color: 'black',
      textAlign: 'left',
      marginTop: `-${theme.spacing(0.5)}px`,
    },
    marked: {
      marginBottom: `-${theme.spacing(1)}px`,
    },
  }))(Slider);

  return <Component {...props} />;
};

ValueSlider.propTypes = {
  colorSlider: PropTypes.string,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  step: PropTypes.number,
  marks: PropTypes.array,
  min: PropTypes.number,
  max: PropTypes.number,
  valueLabelDisplay: PropTypes.number,
  onChange: PropTypes.func,
  onChangeCommitted: PropTypes.func,
};

export { ValueSlider };
export default ValueSlider;
