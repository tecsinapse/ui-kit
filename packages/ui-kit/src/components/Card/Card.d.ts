import { FC, ReactNode } from 'react';

export type CardStyleProps = {
  customSubtitleColor?: string;
  border?: string;
  boxShadow?: string;
  borderLeft?: string;
};

export type CardTitleProps = {
  name?: ReactNode;
  components?: ReactNode;
};

export interface CardProps {
  /** Style for root div */
  style?: object;
  /** Style for card */
  styleCard?: CardStyleProps;
  /** Card onClick event handler */
  onClick?: () => void;
  /** Card title and components */
  title?: CardTitleProps;
  /** Card subtitle */
  subtitle?: ReactNode;
  /** Card content */
  content?: ReactNode;
  /** Card extra content */
  subContent?: ReactNode;
  /** Components to be rendered as card actions */
  actions?: ReactNode;
  /** Function to be rendered on load */
  onLoad?: () => void;
}

declare const Card: FC<CardProps>;

export default Card;
