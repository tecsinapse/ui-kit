import { FC } from 'react';

export interface DividerProps {
  variant?: 'dashed' | 'solid';
}

declare const Divider: FC<DividerProps>;

export default Divider;
