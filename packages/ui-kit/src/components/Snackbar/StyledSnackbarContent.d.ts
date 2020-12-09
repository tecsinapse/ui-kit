import { FC, ReactNode } from 'react';

export interface StyledSnackbarContentProps {
  message?: ReactNode;
  onClose?: () => void;
  variant: 'success' | 'warning' | 'error' | 'info';
}

declare const StyledSnackbarContent: FC<StyledSnackbarContentProps>;

export { StyledSnackbarContent };
export default StyledSnackbarContent;
