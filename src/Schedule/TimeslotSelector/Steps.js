import React from 'react';
import PropTypes from 'prop-types';

import { Step, StepLabel, Typography, Stepper } from '@material-ui/core';

class Steps extends React.Component {
  constructor(props) {
    super(props);
    const steps = [];
    props.steps.forEach((value, key) => {
      steps.push({
        key,
        comp: { label: value.label, stepComponent: value.component },
      });
    });

    this.state = {
      steps,
      step: props.step || 0,
    };
  }

  getStep(stepKey) {
    const { steps } = this.state;
    const components = steps
      .filter(step => step.key === stepKey)
      .map(step => step.comp.stepComponent);
    return components.length >= 1 ? (
      components[0]({
        key: stepKey,
        callNextStep: this.nextStep.bind(this),
        callPreviousStep: this.previousStep.bind(this),
        ...this.props,
      })
    ) : (
      <div />
    );
  }

  getLabels() {
    const { steps } = this.state;
    return steps.map(step => ({ key: step.key, label: step.comp.label }));
  }

  nextStep() {
    const { step, steps } = this.state;
    const next = step + 1;
    if (next < steps.length) {
      this.setState({ step: next });
    }
  }

  previousStep() {
    const { step, steps } = this.state;
    const next = step - 1;
    if (steps.length > 0 && next >= 0) {
      this.setState({ step: next });
    }
  }

  render() {
    const { classes } = this.props;
    const { step } = this.state;
    return (
      <div className={classes.root}>
        <Stepper
          className={classes.stepHeader}
          activeStep={step}
          alternativeLabel
        >
          {this.getLabels().map(lb => (
            <Step key={lb.key}>
              <StepLabel>
                <Typography variant="caption">{lb.label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        {this.getStep(step)}
      </div>
    );
  }
}

Steps.defaultProps = {
  step: 0,
};

Steps.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  step: PropTypes.number,
};

export default Steps;
