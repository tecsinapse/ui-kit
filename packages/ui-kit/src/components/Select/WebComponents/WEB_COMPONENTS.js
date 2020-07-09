import { NoOptionsMessage } from '../CommonComponents/NoOptionsMessage/NoOptionsMessage';
import { Placeholder } from '../CommonComponents/Placeholder/Placeholder';
import { MenuListWeb } from './MenuListWeb/MenuListWeb';
import { OptionWeb } from './OptionWeb/OptionWeb';
import { MenuWeb } from './MenuWeb/MenuWeb';
import { ControlWeb } from './ControlWeb/ControlWeb';
import { SingleValueWeb } from './SingleValueWeb/SingleValueWeb';
import {
  MultiValue,
  ValueContainer,
  IndicatorsContainer,
} from '../CommonComponents';
import { SelectContainer } from './SelectContainer/SelectContainer';

export const WEB_COMPONENTS = {
  NoOptionsMessage,
  Placeholder,
  MultiValue,
  SelectContainer,
  IndicatorsContainer,
  ValueContainer,
  MenuList: MenuListWeb,
  Option: OptionWeb,
  Menu: MenuWeb,
  Control: ControlWeb,
  SingleValue: SingleValueWeb,
};
