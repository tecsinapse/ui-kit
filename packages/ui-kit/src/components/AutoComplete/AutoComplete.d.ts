import {FC, ReactNode} from 'react';
import {InputProps} from "../Inputs";
import {MenuItemProps, PaperProps} from "@material-ui/core";

export type ValuesProps = {
  id: any;
  label: ReactNode;
};

export interface AutoCompleteProps {
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
  values?: ValuesProps[];
  /** Action to perform on delete choosen list item */
  onDeleteItem?: (value: ValuesProps) => void;
  /** Action to perform on select item from list results */
  onSelectItem?: (suggestion: ValuesProps) => void;
  /** Function to query list data */
  options: (value: string) => Promise<ValuesProps[]>;
  /** Text input autocomplete specification */
  autoComplete?: 'on' | 'off';
}

declare const AutoComplete: FC<AutoCompleteProps>;

export default AutoComplete;
