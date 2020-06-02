import React from 'react';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useStyles } from './styles';

export const Circular = ({
  size,
  strokeWidth,
  activeStep,
  children,
  nextLabel,
  error,
  warning,
}) => {
  const classes = useStyles();
  const steps = React.Children.map(children, arg => {
    return arg.props.title;
  });

  const radius = (size - strokeWidth) / 2;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const percentage = ((activeStep + 1) / steps.length) * 100; // (activeStep / steps.length) * 100;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  const strokeColor = {
    [classes.strokeOrange]: warning,
    [classes.strokeRed]: error,
  };

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
              className={clsx(classes.circleProgress, strokeColor)}
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
