/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useContext, useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Step from '@material-ui/core/Step';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { defaultGreen, defaultRed } from '@tecsinapse/ui-kit/build/colors';
import { Button } from '@tecsinapse/ui-kit';
import { LocaleContext } from '@tecsinapse/ui-kit/build/LocaleProvider';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  completedStep: {
    color: `${defaultGreen} !important`,
  },
  disabledStep: {},
  errorStep: {
    color: `${defaultRed} !important`,
  },
  activeStep: {
    color: `${theme.palette.secondary.main} !important`,
    textColor: theme.palette.secondary.contrastText,
  },
  stepper: {},
  wizard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  wizardContent: {
    flexGrow: 1,
  },
  wizardFooter: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepLabels: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
}));
export const Wizard = ({
  children,
  activeStep,
  onChange,
  classes = {},
  className,
  isSubmitting,
  stepText = 'Step',
  hideBottomStepLabel = false,
}) => {
  const currentStep = React.Children.toArray(children)[activeStep];
  const [error, setError] = useState(false);
  const {
    Wizard: { finishText, nextText, backText },
  } = useContext(LocaleContext);
  const innerClasses = useStyles();
  const nextStep = async increment => {
    const onChangeError = await onChange(activeStep + increment);
    if (onChangeError) {
      setError(onChangeError);
    } else {
      setError(null);
    }
  };
  return (
    <div className={clsx(innerClasses.wizard, className, classes.root)}>
      <Paper>
        <Stepper
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
                  optional={
                    error &&
                    activeStep === index && (
                      <Typography
                        variant="caption"
                        color="error"
                        align="center"
                      >
                        {error}
                      </Typography>
                    )
                  }
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
        </Stepper>
      </Paper>
      <div className={clsx(innerClasses.wizardContent, classes.content)}>
        {currentStep.props.children}
      </div>
      <div className={clsx(innerClasses.wizardFooter, classes.footer)}>
        <div className={innerClasses.stepLabels}>
          <Typography variant="button">
            {!hideBottomStepLabel && `${stepText} ${activeStep + 1}:`}
          </Typography>
          &nbsp;
          <Typography>
            {currentStep.props.warningText && currentStep.props.warningText}
          </Typography>
        </div>
        <div className={innerClasses.margin}>
          {activeStep > 0 && (
            <Button
              size="large"
              type="button"
              variant="contained"
              customVariant="default"
              submitting={isSubmitting}
              className={innerClasses.margin}
              onClick={() => {
                nextStep(-1);
              }}
            >
              {backText}
            </Button>
          )}
          <Button
            size="large"
            type="button"
            submitting={isSubmitting}
            customVariant={error ? 'error' : 'success'}
            variant="contained"
            className={innerClasses.margin}
            onClick={() => {
              nextStep(+1);
            }}
          >
            {activeStep < React.Children.count(children) - 1
              ? nextText
              : finishText}
          </Button>
        </div>
      </div>
    </div>
  );
};

Wizard.defaultProps = {
  classes: {},
  stepText: 'Step',
  hideBottomStepLabel: false,
};

Wizard.propTypes = {
  children: PropTypes.any,
  activeStep: PropTypes.number,
  onChange: PropTypes.func,
  classes: PropTypes.object,
  className: PropTypes.any,
  isSubmitting: PropTypes.bool,
  stepText: PropTypes.string,
  hideBottomStepLabel: PropTypes.bool,
};
