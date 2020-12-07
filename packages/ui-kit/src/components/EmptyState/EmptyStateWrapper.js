import React from 'react';
import { default as EmptyState } from './EmptyState';

export const EmptyStateWrapper = ({ children, ...props }) =>
  children && children.length ? children : <EmptyState {...props} />;

export default EmptyStateWrapper;
