import {DropdownIndicator} from "./DropdownIndicator";
import {IndicatorsContainer} from "./IndicatorsContainer";
import {NoOptionsMessage} from "./NoOptionsMessage";
import {Placeholder} from "./Placeholder";
import {ValueContainer} from "./ValueContainer";
import {MenuListWeb} from "./MenuListWeb";
import {OptionWeb} from "./OptionWeb";
import {MenuWeb} from "./MenuWeb";
import {ControlWeb} from "./ControlWeb";
import {SingleValueWeb} from "./SingleValueWeb";

export const selectCustomWebComponents = {
  NoOptionsMessage,
  Placeholder,
  ValueContainer,
  DropdownIndicator,
  IndicatorsContainer,
  MenuList:MenuListWeb,
  Option:OptionWeb,
  Menu:MenuWeb,
  Control:ControlWeb,
  SingleValue:SingleValueWeb,
 };
