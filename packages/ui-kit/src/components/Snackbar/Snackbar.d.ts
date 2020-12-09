import { FC } from 'react';

export interface SnackbarProps {
  /** Close Snackbar func */
  onClose?: () => void;
  /** Display snackbar */
  show: boolean;
  /** Snackbar variant */
  variant: 'success' | 'warning' | 'error' | 'info';
  /** Auto hide timeout */
  autoHideDuration?: number;
}

declare const Snackbar: FC<SnackbarProps>;

export default Snackbar;
