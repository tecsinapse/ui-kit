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
  ));
