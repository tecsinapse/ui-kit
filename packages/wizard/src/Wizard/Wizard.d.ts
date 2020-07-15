import { ReactNode, FC } from 'react';

export type Variant = 'auto' | 'web' | 'mobile';

export interface LabelsProps {
  /** Label used to display 'Finish' button label */
  finishText?: string;
  /** Label used to display 'Next' button label */
  nextText?: string;
  /** Label used to display 'Back' button label */
  backText?: string;
  /** Label used to display 'Next' step on mobile */
  nextMobileLabel?: string;
  /** Label used to display N 'of' M on mobile */
  stepMobileLabel?: string;
}

export interface WizardProps {
  /** Element children to be rendered */
  children: ReactNode;
  /** Active step index */
  activeStep: number;
  /** Change step handler */
  onChange(newStep: number): string | undefined;
  /** Styles object to decorate component */
  classes?: object;
  /** CSS class name applied to root div */
  className?: string;
  /** Subitting loading state */
  isSubmitting?: boolean;
  /** Choose wich variant of wizard should render */
  variant?: Variant;
  /** Size of circular stepper (mobile) */
  size?: number;
  /** Stroke width of circular stepper (mobile) */
  strokeWidth?: number;
  /** Labels used on Wizard */
  labels?: LabelsProps;
}

declare const Wizard: FC<WizardProps>;

export default Wizard;
