import { FC, ReactNode } from 'react';

export type ValuesProps = {
  id: unknown;
  label: ReactNode;
};

export interface AutoCompleteProps {
  /** Props passed to Input component */
  inputProps?: object;
  /** Props passed to Paper results area */
  paperProps?: object;
  /** Props passed to individual MenuItem result */
  itemProps?: object;
  /** Values choosen from input */
  values?: ValuesProps[];
  /** Action to perform on delete choosen list item */
  onDeleteItem?: (value: object) => void;
  /** Action to perform on select item from list results */
  onSelectItem?: (suggestion: object) => void;
  /** Function to query list data */
  options: Function;
  /** Text input autocomplete specification */
  autoComplete?: 'on' | 'off';
}

declare const AutoComplete: FC<AutoCompleteProps>;

export default AutoComplete;
