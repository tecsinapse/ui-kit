import { FC } from 'react';

export interface FlagProps {
  variant: 'brazil' | 'spain' | 'united-states';
  width?: number;
}

declare const Flag: FC<FlagProps>;

export default Flag;
