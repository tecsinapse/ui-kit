import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { defaultGreen } from '@tecsinapse/ui-kit/build/colors';

const useStyles = makeStyles(({ spacing }) => ({
  circularStepperContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    padding: spacing(1),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleBackground: {
    stroke: '#D3D3D3',
    fill: 'none',
  },
  circleProgress: {
    stroke: ({ warning, error }) => {
      if (warning) {
        return '#f99f1f';
      }
      if (error) {
        return '#e6433f';
      }
      return defaultGreen;
    },
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    transition: '0.6s',
    fill: 'none',
  },
  circleText: {
    fontSize: '1.1em',
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
  circularStepperText: {
    marginLeft: spacing(2),
    textAlign: 'right',
  },
  currentStepText: {
    fontSize: '1.3em',
    fontWeight: 500,
    letterSpacing: '0.25px',
  },
}));

export const Circular = ({
  size,
  strokeWidth,
  activeStep,
  children,
  nextLabel,
  error,
  warning,
}) => {
  const classes = useStyles({ error, warning });
  const steps = React.Children.map(children, (arg, index) => {
    return arg.props.title;
  });

  const radius = (size - strokeWidth) / 2;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const percentage = ((activeStep + 1) / steps.length) * 100; // (activeStep / steps.length) * 100;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <>
      <div className={classes.circularStepperContainer}>
        <div>
          <svg width={size} height={size}>
            <circle
              className={classes.circleBackground}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
            />
            <circle
              className={classes.circleProgress}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              style={{
                strokeDasharray: dashArray,
                strokeDashoffset: dashOffset,
              }}
            />
            <text
              x="50%"
              y="50%"
              dy=".3em"
              textAnchor="middle"
              className={classes.circleText}
            >
              {activeStep + 1} of {steps.length}
            </text>
          </svg>
        </div>
        <div className={classes.circularStepperText}>
          <Typography variant="subtitle1" className={classes.currentStepText}>
            {steps[activeStep]}
          </Typography>
          {steps[activeStep + 1] && (
            <Typography variant="body2">{`${nextLabel}: ${
              steps[activeStep + 1]
            }`}</Typography>
          )}
        </div>
      </div>
    </>
  );
};
