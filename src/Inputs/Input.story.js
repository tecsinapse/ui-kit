import React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from './Input';
import { GROUPS } from '../../.storybook/hierarchySeparators';

storiesOf(`${GROUPS.FORMS}|Input`, module)
  .add('input', () => <Input name="a" label="Placeholder" />)
  .add('input invalid', () => (
    <Input
      name="a"
      error="Insira um valor entre o mínimo e o máximo"
      value="Valor Inválido"
      label="Placeholder"
    />
  ))
  .add('input success', () => (
    <Input success name="a" value="Valor Inválido" label="Placeholder" />
  ))
  .add('input warning', () => (
    <Input warning name="a" value="Valor Inválido" label="Placeholder" />
  ))
  .add('input disabled', () => (
    <Input name="a" value="Valor Desabilitado" disabled label="Placeholder" />
  ))
  .add('input mask date-raw', () => (
    <Input
      name="a"
      label="Placeholder"
      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
    />
  ))
  .add('input mask  phone', () => (
    <Input name="a" label="Placeholder" mask="phone" />
  ))
  .add('input mask  cellphone', () => (
    <Input name="a" label="Placeholder" mask="cellphone" />
  ))
  .add('input mask  cpf', () => (
    <Input name="a" label="Placeholder" mask="cpf" />
  ))
  .add('input mask  cnpj', () => (
    <Input name="a" label="Placeholder" mask="cnpj" />
  ))
  .add('input mask  cpf/cnpj', () => (
    <Input name="a" label="Placeholder" mask="cpfcnpj" />
  ))
  .add('input mask  currency', () => (
    <Input name="a" label="Placeholder" mask="currency" />
  ))
  .add('input mask  plate (mercosul)', () => (
    <Input name="a" label="Placeholder" mask="plate" />
  ))
  .add('input mask invalid', () => (
    <Input name="a" label="Placeholder" mask="blamask" />
  ));
