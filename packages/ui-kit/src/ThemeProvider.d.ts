import { FC, ReactNode } from 'react';

export interface ThemeProviderProps {
  variant:
    | 'orange'
    | 'yellow'
    | 'blueGrey'
    | 'black'
    | 'redLight'
    | 'green'
    | 'deepBlack'
    | 'blackOrange'
    | 'blueLight'
    | 'deepBlue'
    | 'micBlue'
    | 'greyLight'
    | 'lightOrange'
    | 'blueOcean'
    | 'shallowBlue'
    | 'wingo'
    | 'bajaj';
  overrides?: object;
  spacing?: number;
  children?: ReactNode;
}

declare const ThemeProvider: FC<ThemeProviderProps>;

export default ThemeProvider;
