import { FC, ReactNode } from 'react';

export interface ConfirmationAlertProps {
  /** Display dialog */
  show: boolean;
  /** Confirm click callback */
  proceed: () => void;
  /** Callback when clicking out of dialog */
  dismiss: () => void;
  /** Cancel dialog callback */
  cancel: () => void;
  /** Dialog title */
  text?: ReactNode;
  /** Cancel button label */
  cancelButtonText?: ReactNode;
  /** Confirm button label */
  confirmButtonText?: ReactNode;
}

declare const ConfirmationAlert: FC<ConfirmationAlertProps>;

export default ConfirmationAlert;
