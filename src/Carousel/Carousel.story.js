import React from 'react';
import { storiesOf } from '@storybook/react';

import { GROUPS } from '../../.storybook/hierarchySeparators';
import { Slide } from './Slide';
import { AutoRotatingCarousel } from './AutoRotatingCarousel';
import { DivFlex } from '../withFlexCenter';

storiesOf(`${GROUPS.COMPONENTS}|Carousel`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('carousel single', () => (
    <div style={{ width: '700px', height: '400px' }}>
      <AutoRotatingCarousel>
        <Slide
          title="Seja bem-vindo ao novo Portal"
          titleColor="#f69322"
          subtitle="Com novos recursos e design mais atrativo e fácil de usar. Aproveite as novidades!<br/>Dúvidas? Acesse a Central de Relacionamentos, HelpTec."
          backgroundImage="https://ak6.picdn.net/shutterstock/videos/21643606/thumb/1.jpg"
          buttonTitle="ACESSAR HELPTEC"
          link="https://www.tecsinapse.com.br/"
          linkTarget="_blank"
        />
      </AutoRotatingCarousel>
    </div>
  ))
  .add('carousel multiple', () => (
    <div style={{ width: '700px', height: '400px' }}>
      <AutoRotatingCarousel autoplay>
        <Slide
          link="http://www.tecsinapse.com.br"
          linkTarget="_blank"
          backgroundImage="https://www.sokolovelaw.com/wp-content/uploads/automotive-mechanics.jpg"
          title="Relatório de Manuntenção BMW"
          subtitle="Já estão disponíveis todos os relatórios de manuntenção de 2019."
        />
        <Slide
          link="http://www.tecsinapse.com.br"
          linkTarget="_blank"
          backgroundImage="https://autonesian.com/wp-content/uploads/2017/02/astra-autoprima-bmw-2-700x400.jpg"
          title="Comitê Geral Seleciona Integrantes"
          subtitle="O comitê geral elegeu os novos membros para o Premium Selection."
        />
      </AutoRotatingCarousel>
    </div>
  ))
  .add('carousel mobile', () => (
    <div style={{ width: '100vw', height: '300px' }}>
      <AutoRotatingCarousel variant="mobile">
        <Slide
          link="http://www.tecsinapse.com.br"
          linkTarget="_blank"
          backgroundImage="http://b.static.trunity.net/files/299501_299600/299598/vertical-farming-chris-jacobs.jpg"
          title="Relatório de Manuntenção BMW"
          subtitle="Já estão disponíveis todos os relatórios de manuntenção de 2019."
          buttonTitle="SAIBA MAIS"
          mobile
        />
        <Slide
          link="http://www.tecsinapse.com.br"
          linkTarget="_blank"
          backgroundImage="https://autonesian.com/wp-content/uploads/2017/02/astra-autoprima-bmw-2-700x400.jpg"
          title="Comitê Geral Seleciona Integrantes"
          subtitle="O comitê geral elegeu os novos membros para o Premium Selection."
          mobile
        />
      </AutoRotatingCarousel>
    </div>
  ));
