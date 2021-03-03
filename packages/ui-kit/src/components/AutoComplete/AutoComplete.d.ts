import {FC, ReactNode} from 'react';
import {InputProps} from "../Inputs";
import {MenuItemProps, PaperProps} from "@material-ui/core";

export type ValuesProps<T> = {
  id: T;
  label: ReactNode;
};

export interface AutoCompleteProps<T> {
  /** Props passed to Input component */
  inputProps?: Omit<InputProps,
    'error' |
    'endAdornment' |
    'inputRef'>;
  /** Props passed to Paper results area */
  paperProps?: PaperProps;
  /** Props passed to individual MenuItem result */
  itemProps?: MenuItemProps;
  /** Values choosen from input */
  values?: ValuesProps<T>[];
  /** Action to perform on delete choosen list item */
  onDeleteItem?: (value: ValuesProps<T>) => void;
  /** Action to perform on select item from list results */
  onSelectItem?: (suggestion: ValuesProps<T>) => void;
  /** Function to query list data */
  options: (value: string) => Promise<ValuesProps<T>[]>;
  /** Text input autocomplete specification */
  autoComplete?: 'on' | 'off';
}

declare const AutoComplete: <T>(props: AutoCompleteProps<T>) => JSX.Element;

export default AutoComplete;
