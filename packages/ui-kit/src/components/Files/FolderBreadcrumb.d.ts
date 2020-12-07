import { FC, ReactNode } from 'react';

export type BreadcrumbsProps = {
  title: ReactNode;
  component?: ReactNode;
  componentProps?: object;
};

export interface FolderBreadcrumbProps {
  breadcrumbs: string[] | BreadcrumbsProps[];
  light?: boolean;
  dense?: boolean;
}

declare const FolderBreadcrumb: FC<FolderBreadcrumbProps>;

export default FolderBreadcrumb;
