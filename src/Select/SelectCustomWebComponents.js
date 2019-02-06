import {NoOptionsMessage} from './NoOptionsMessage';
import {Placeholder} from './Placeholder';
import {MenuListWeb} from './MenuListWeb';
import {OptionWeb} from './OptionWeb';
import {MenuWeb} from './MenuWeb';
import {ControlWeb} from './ControlWeb';
import {SingleValueWeb} from './SingleValueWeb';
import {MultiValue} from "./MultiValue";

export const selectCustomWebComponents = {
  NoOptionsMessage,
  Placeholder,
  MultiValue,
  // ValueContainer, // isso tá quebrando o multi
  MenuList: MenuListWeb,
  Option: OptionWeb,
  Menu: MenuWeb,
  Control: ControlWeb,
  SingleValue: SingleValueWeb,
};
