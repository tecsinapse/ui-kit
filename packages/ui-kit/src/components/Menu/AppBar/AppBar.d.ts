import { FC, ReactNode } from 'react';

export type BreadcrumbsProps = {
  title: ReactNode;
  component?: ReactNode;
  componentProps?: object;
};

export interface AppBarProps {
  /** Bar title */
  title?: ReactNode;
  /** Bar subtitle */
  subtitle?: ReactNode;
  /** Replace bar title for a component */
  titleComponent?: ReactNode;
  /** Fired when menu icon is clicked */
  menuOnClick?: () => void;
  /** Icons placed to the left of title */
  leftIcons?: ReactNode;
  /** Icons placed to the right of title */
  rightIcons?: ReactNode;
  /** If component is `a`, you can pass `{ href: URL }` as `componentProps` */
  breadcrumbs?: BreadcrumbsProps[];
  loadingBreadcrumbs?: boolean;
  /** Disable breadcrumb line */
  disableBreadcrumb?: boolean;
  /** Show search */
  searchBar?: boolean;
  /** Display menu option */
  menuBar?: boolean;
  /** Fired when the text value changes. */
  onChange: (value: unknown) => void;
  /** Fired when the search icon is clicked. */
  onRequestSearch?: (value: unknown) => void;
  /** Sets placeholder text for the embedded text field. */
  placeholder?: string;
  /** Fired when the bar enters in the search mdoe */
  onSearchMode?: () => void;
  /** Fired when the bar leaves the search mode */
  onCancelSearchMode?: () => void;
}

declare const AppBar: FC<AppBarProps>;

export default AppBar;
