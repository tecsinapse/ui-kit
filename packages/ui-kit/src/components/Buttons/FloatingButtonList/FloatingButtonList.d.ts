import { FC, ReactNode } from 'react';
import { FloatingButtonProps } from '../FloatingButton';

export type FloatingButtonListItemProp = {
  text?: string;
  component?: ReactNode;
};

export interface FloatingButtonListProps extends FloatingButtonProps {
  items?: FloatingButtonListItemProp[];
  onClick?: () => void;
  open?: boolean;
}

declare const FloatingButtonList: FC<FloatingButtonListProps>;

export default FloatingButtonList;
