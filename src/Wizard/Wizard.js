import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, useMediaQuery, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import { defaultGreen, defaultRed } from '@tecsinapse/ui-kit/build/colors';
import { Button } from '@tecsinapse/ui-kit';
import Icon from '@mdi/react';
import { mdiInformation } from '@mdi/js';
import PropTypes from 'prop-types';
import { Stepper } from '../Stepper/Stepper';
import { Circular } from '../Circular/Circular';

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
  stepper: { backgroundColor: 'transparent' },
  wizard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  wizardContent: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  wizardFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  stepAlert: {
    margin: theme.spacing(0, 1, 0, 1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ({ error }) => (!error ? '#f99f1f' : '#e6433f'),
    padding: theme.spacing(1 / 2),
    borderRadius: '5px',
  },
  nextButton: {
    marginLeft: theme.spacing(1 / 2),
    minWidth: '25%',
  },
  backButton: {
    marginRight: theme.spacing(1 / 2),
    minWidth: '25%',
  },
}));
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
  const innerClasses = useStyles({ error });

  const {
    finishText = 'Finish',
    nextText = 'Next',
    backText = 'Back',
    nextMobileLabel = 'Next',
  } = labels;

  const nextStep = async increment => {
    const onChangeError = await onChange(activeStep + increment);
    if (onChangeError) {
      setError(onChangeError);
    } else {
      setError(null);
    }
  };

  const iconMargin = { margin: '0 6px 0 4px' };
  const alertColor = { color: '#fff' };

  return (
    <div className={clsx(innerClasses.wizard, className, classes.root)}>
      {mobile ? (
        <Circular
          activeStep={activeStep}
          size={size}
          strokeWidth={strokeWidth}
          nextLabel={nextMobileLabel}
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
        <div className={innerClasses.stepAlert}>
          <Icon
            path={mdiInformation}
            size={0.8}
            color="#fff"
            style={iconMargin}
          />
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
          onClick={() => {
            nextStep(-1);
          }}
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
          customVariant={error ? 'error' : 'success'}
          variant="contained"
          onClick={() => {
            nextStep(+1);
          }}
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
  }),
};
