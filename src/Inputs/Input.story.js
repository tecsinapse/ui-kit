import React from 'react';
import { storiesOf } from '@storybook/react';

import AccountCircle from '@material-ui/icons/AccountCircle';
import { Description, Props, Title } from '@storybook/addon-docs/dist/blocks';
import { Input } from './Input';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { DivFlex } from '../withFlexCenter';

storiesOf(`${GROUPS.FORMS}|Input`, module)
  .addParameters({
    component: Input,
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            The `Input` component can receive the following props:
          </Description>
          <Props />
        </>
      ),
    },
  })
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('input', () => <Input name="a" label="Placeholder" />)
  .add('input with addornment', () => (
    <Input name="a" label="Placeholder" endAdornment={<AccountCircle />} />
  ))
  .add('input with both addornment', () => (
    <Input
      name="a"
      label="Placeholder"
      endAdornment={<AccountCircle />}
      startAdornment={<AccountCircle />}
    />
  ))
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
  .add('input mask cep', () => (
    <Input name="a" label="Placeholder" mask="cep" />
  ))
  .add('input mask date', () => (
    <Input name="a" label="Placeholder" mask="date" />
  ))
  .add('input mask time', () => (
    <Input name="a" label="Placeholder" mask="time" />
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
  .add('input mask  percentage', () => (
    <Input name="a" label="Placeholder" mask="percentage" />
  ));
