import React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from './Input';
import { GROUPS } from '../../.storybook/hierarchySeparators';

storiesOf(`${GROUPS.FORMS}|Input`, module)
  .add('input', () => <Input label="Placeholder" />)
  .add('input invalid', () => (
    <Input
      error="Insira um valor entre o mínimo e o máximo"
      value="Valor Inválido"
      label="Placeholder"
    />
  ))
  .add('input success', () => (
    <Input
      success
      value="Valor Inválido"
      label="Placeholder"
    />
  ))
  .add('input warning', () => (
    <Input
      warning
      value="Valor Inválido"
      label="Placeholder"
    />
  ))
  .add('input disabled', () => (
    <Input value="Valor Desabilitado" disabled label="Placeholder" />
  ));
