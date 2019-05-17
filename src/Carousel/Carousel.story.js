import React from 'react';
import { storiesOf } from '@storybook/react';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import Slide from './Slide';
import { AutoRotatingCarousel } from './AutoRotatingCarousel';

storiesOf(`${GROUPS.COMPONENTS}|Carousel`, module)
  .add('carousel single', () => (
    <div style={{ width: '700px', height: '400px' }}>
      <AutoRotatingCarousel>
        <Slide
          link="http://www.google.com.br"
          titleImage="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/100px-BMW.svg.png"
          title="Relatório de Manuntenção BMW 2019"
          subtitle="Já estão disponíveis todos os relatórios de manuntenção de 2019 com todas as informações técnicas de recall"
          backgroundImage="https://www.sokolovelaw.com/wp-content/uploads/automotive-mechanics.jpg"
        />
      </AutoRotatingCarousel>
    </div>
  ))
  .add('carousel multiple', () => (
    <div style={{ width: '700px', height: '400px' }}>
      <AutoRotatingCarousel>
        <Slide
          link="http://www.google.com.br"
          titleImage="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/100px-BMW.svg.png"
          title="Relatório de Manuntenção BMW 2019"
          subtitle="Já estão disponíveis todos os relatórios de manuntenção de 2019 com todas as informações técnicas de recall"
          backgroundImage="https://www.sokolovelaw.com/wp-content/uploads/automotive-mechanics.jpg"
        />

        <Slide
          titleImage="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/100px-BMW.svg.png"
          title="Comitê Geral Seleciona Integrantes"
          subtitle="O comitê geral elegeu os novos membros para o Premium Selection"
          backgroundImage="https://autonesian.com/wp-content/uploads/2017/02/astra-autoprima-bmw-2-700x400.jpg"
        />
      </AutoRotatingCarousel>
    </div>
  ))
  .add('carousel mobile', () => (
    <div style={{ width: '100vw', height: '100%' }}>
      <AutoRotatingCarousel variant="mobile">
        <Slide
          link="http://www.google.com.br"
          titleImage="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/100px-BMW.svg.png"
          title="Relatório de Manuntenção BMW 2019"
          subtitle="Já estão disponíveis todos os relatórios de manuntenção de 2019 com todas as informações técnicas de recall"
          backgroundImage="https://www.sokolovelaw.com/wp-content/uploads/automotive-mechanics.jpg"
        />

        <Slide
          titleImage="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/100px-BMW.svg.png"
          title="Comitê Geral Seleciona Integrantes"
          subtitle="O comitê geral elegeu os novos membros para o Premium Selection"
          backgroundImage="https://autonesian.com/wp-content/uploads/2017/02/astra-autoprima-bmw-2-700x400.jpg"
        />
      </AutoRotatingCarousel>
    </div>
  ));
