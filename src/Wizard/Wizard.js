import React, { useState } from 'react';
import { Typography, useMediaQuery, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import { Button } from '@tecsinapse/ui-kit';
import Icon from '@mdi/react';
import { mdiInformation } from '@mdi/js';
import PropTypes from 'prop-types';
import { Stepper } from '../Stepper/Stepper';
import { Circular } from '../Circular/Circular';
import { useStyles, alertColor, iconMargin } from './styles';

export const Wizard = ({
  children,
  activeStep,
  onChange,
  classes = {},
  className,
  isSubmitting,
  variant,
  size,
  strokeWidth,
  labels,
}) => {
  const currentStep = React.Children.toArray(children)[activeStep];
  const [error, setError] = useState(false);
  const mobile =
    useMediaQuery(useTheme().breakpoints.down('xs')) || variant === 'mobile';
  const innerClasses = useStyles();

  const {
    finishText = 'Finish',
    nextText = 'Next',
    backText = 'Back',
    nextMobileLabel = 'Next',
    stepMobileLabel = 'of',
  } = labels;

  const nextStep = async increment => {
    const onChangeError = await onChange(activeStep + increment);
    if (onChangeError) {
      setError(onChangeError);
    } else {
      setError(null);
    }
  };

  const handleBack = () => {
    nextStep(-1);
  };
  const handleNext = () => {
    nextStep(+1);
  };
  const alertBg = error ? innerClasses.bgRed : innerClasses.bgOrange;
  const customVariant = error ? 'error' : 'success';

  return (
    <div className={clsx(innerClasses.wizard, className, classes.root)}>
      {mobile ? (
        <Circular
          activeStep={activeStep}
          size={size}
          strokeWidth={strokeWidth}
          nextLabel={nextMobileLabel}
          stepMobileLabel={stepMobileLabel}
          error={error}
          warning={currentStep.props.warningText}
        >
          {children}
        </Circular>
      ) : (
        <Stepper
          activeStep={activeStep}
          error={error}
          innerClasses={innerClasses}
        >
          {children}
        </Stepper>
      )}
      <div className={clsx(innerClasses.wizardContent, classes.content)}>
        {currentStep.props.children}
      </div>
      {(error || currentStep.props.warningText) && (
        <div className={clsx(innerClasses.stepAlert, alertBg)}>
          <div style={iconMargin}>
            <Icon path={mdiInformation} size={0.8} color="#fff" />
          </div>
          <Typography style={alertColor}>
            {error || currentStep.props.warningText}
          </Typography>
        </div>
      )}
      <div className={clsx(innerClasses.wizardFooter, classes.footer)}>
        <Button
          size="large"
          type="button"
          variant="contained"
          customVariant="default"
          submitting={isSubmitting}
          onClick={handleBack}
          disabled={activeStep === 0}
          fullWidth={mobile}
          className={innerClasses.backButton}
        >
          {backText}
        </Button>
        <Button
          size="large"
          type="button"
          submitting={isSubmitting}
          customVariant={customVariant}
          variant="contained"
          onClick={handleNext}
          fullWidth={mobile}
          className={innerClasses.nextButton}
        >
          {activeStep < React.Children.count(children) - 1
            ? nextText
            : finishText}
        </Button>
      </div>
    </div>
  );
};

Wizard.defaultProps = {
  children: undefined,
  activeStep: 0,
  onChange: () => {},
  className: undefined,
  isSubmitting: false,
  classes: {},
  variant: 'auto',
  size: 75,
  strokeWidth: 5,
  labels: {
    finishText: 'Finish',
    nextText: 'Next',
    backText: 'Back',
    nextMobileLabel: 'Next',
    stepMobileLabel: 'of',
  },
};

Wizard.propTypes = {
  /** Element children to be rendered */
  children: PropTypes.node,
  /** Active step index */
  activeStep: PropTypes.number,
  /** Change step handler */
  onChange: PropTypes.func,
  /** Styles object to decorate component */
  classes: PropTypes.object,
  /** CSS class name applied to root div */
  className: PropTypes.string,
  /** Subitting loading state */
  isSubmitting: PropTypes.bool,
  /** Choose wich variant of wizard should render */
  variant: PropTypes.oneOf(['auto', 'web', 'mobile']),
  /** Size of circular stepper (mobile) */
  size: PropTypes.number,
  /** Stroke width of circular stepper (mobile) */
  strokeWidth: PropTypes.number,
  /** Labels used on Wizard */
  labels: PropTypes.shape({
    finishText: PropTypes.string,
    nextText: PropTypes.string,
    backText: PropTypes.string,
    nextMobileLabel: PropTypes.string,
    stepMobileLabel: PropTypes.string,
  }),
};
