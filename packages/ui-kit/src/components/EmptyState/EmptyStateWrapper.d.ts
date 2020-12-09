import { FC, ReactNode } from 'react';
import { EmptyStateProps } from './EmptyState';

export interface EmptyStateWrapperProps extends EmptyStateProps {
  children?: ReactNode;
}

declare const EmptyStateWrapper: FC<EmptyStateWrapperProps>;

export default EmptyStateWrapper;
