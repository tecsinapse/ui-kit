import { NoOptionsMessage } from './NoOptionsMessage';
import { Placeholder } from './Placeholder';
import { MenuListWeb } from './MenuListWeb';
import { OptionWeb } from './OptionWeb';
import { MenuWeb } from './MenuWeb';
import { ControlWeb } from './ControlWeb';
import { SingleValueWeb } from './SingleValueWeb';
import { MultiValue } from './MultiValue';
import { SelectContainer } from './SelectContainer';
import { ValueContainer } from './ValueContainer';
import { IndicatorsContainer } from './IndicatorContainer';
import { MultiValueContainer } from './MultiValueContainer';

export const selectCustomWebComponents = {
  NoOptionsMessage,
  Placeholder,
  MultiValue,
  MultiValueContainer,
  SelectContainer,
  IndicatorsContainer,
  ValueContainer,
  MenuList: MenuListWeb,
  Option: OptionWeb,
  Menu: MenuWeb,
  Control: ControlWeb,
  SingleValue: SingleValueWeb,
};
