import React from 'react';
import { storiesOf } from '@storybook/react';

import { GROUPS } from '../../.storybook/hierarchySeparators';
import { Slide } from '../Carousel/Slide';
import { AutoRotatingCarousel } from '../Carousel/AutoRotatingCarousel';
import { EmptyState } from './EmptyState';

storiesOf(`${GROUPS.COMPONENTS}|EmptyState`, module).add('Empty State', () => (
  <div>
    <AutoRotatingCarousel autoplay>
      <Slide
        link="http://www.tecsinapse.com.br"
        linkTarget="_blank"
        backgroundImage="https://www.sokolovelaw.com/wp-content/uploads/automotive-mechanics.jpg"
        title="Relatório de Manuntenção BMW"
        subtitle="Já estão disponíveis todos os relatórios de manuntenção de 2019."
        buttonTitle="SAIBA MAIS"
      />
      <Slide
        link="http://www.tecsinapse.com.br"
        linkTarget="_blank"
        backgroundImage="https://autonesian.com/wp-content/uploads/2017/02/astra-autoprima-bmw-2-700x400.jpg"
        title="Comitê Geral Seleciona Integrantes"
        subtitle="O comitê geral elegeu os novos membros para o Premium Selection."
        buttonTitle="SAIBA MAIS"
      />
    </AutoRotatingCarousel>
    <EmptyState />
  </div>
));
