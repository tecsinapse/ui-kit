import React from 'react';
import { Step, StepLabel, Stepper as StepperMUI } from '@material-ui/core';

export const Stepper = ({ children, activeStep, innerClasses, error }) => {
  return (
    <StepperMUI
      activeStep={activeStep}
      alternativeLabel
      className={innerClasses.stepper}
    >
      {React.Children.map(children, (arg, index) => {
        const { title } = arg.props;
        return (
          <Step key={title}>
            <StepLabel
              error={error && activeStep === index && true}
              StepIconProps={{
                classes: {
                  completed: innerClasses.completedStep,
                  active: innerClasses.activeStep,
                  error: innerClasses.errorStep,
                },
              }}
            >
              {title}
            </StepLabel>
          </Step>
        );
      })}
    </StepperMUI>
  );
};
