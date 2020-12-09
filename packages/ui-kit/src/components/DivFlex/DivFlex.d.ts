import { FC, ReactNode } from 'react';

export interface DivFlexProps {
  children?: ReactNode;
  style?: object;
}

declare const DivFlex: FC<DivFlexProps>;

export default DivFlex;
