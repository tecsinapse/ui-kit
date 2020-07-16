import { ReactNode, FC } from 'react';

export interface PickersProviderProps {
  children: ReactNode;
  locale?: string;
}
declare const PickersProvider: FC<PickersProviderProps>;

export default PickersProvider;
