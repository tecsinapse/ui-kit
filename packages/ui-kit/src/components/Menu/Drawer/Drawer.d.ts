import { FC, ReactNode } from 'react';

export type DrawerMenuItemProps = {
  title: ReactNode;
  component?: ReactNode;
  componentProps?: object;
  styleProps?: object;
  children?: DrawerMenuItemProps[];
};

export interface DrawerProps {
  /** Display drawer */
  open: boolean;
  /** Close drawer func */
  onClose: () => void;
  /** Drawer title */
  title: ReactNode;
  id?: unknown;
  /** Styles passed to MenuList */
  styleProps?: object;
  /** CSS class passed to root Drawer */
  className?: string;
  /** Drawer subtitle */
  subtitle: ReactNode;
  productName: string;
  /** Items passed to menu. This prop have a `children` attribute where you can nest sub items */
  items: DrawerMenuItemProps[];
  /** Search placeholder */
  searchBarPlaceholder?: string;
  /** source image logo */
  srcLogo?: string;
  /** source image avatar */
  srcAvatar?: string;
  /** change width logo */
  widthLogo?: number | string;
  /** change height logo */
  heightLogo?: number | string;
}

declare const Drawer: FC<DrawerProps>;

export default Drawer;
