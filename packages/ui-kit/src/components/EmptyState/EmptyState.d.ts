import { FC, ReactNode } from 'react';

export interface EmptyStateProps {
  /** Icon to be displayed */
  IconComponent?: ReactNode;
  /** Custom message title */
  titleMessage?: ReactNode;
  /** Custom message */
  message?: ReactNode;
  /** Custom message title when no connection available */
  noConnectionTitle?: ReactNode;
  /** Custom message when offline */
  offlineMessage?: ReactNode;
}

declare const EmptyState: FC<EmptyStateProps>;

export default EmptyState;
