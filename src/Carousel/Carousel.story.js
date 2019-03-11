import React from 'react';
import { storiesOf } from '@storybook/react';
import Slide from './Slide';
import AutoRotatingCaorusel from './AutoRotatingCarousel';

storiesOf(`Carousel`, module)
  .add('carousel single', () => (
    <div style={{ width: '700px', height: '400px' }}>
      <AutoRotatingCaorusel>
        <Slide
          link="http://www.google.com.br"
          titleImage="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/100px-BMW.svg.png"
          title="Relatório de Manuntenção BMW 2019"
          subtitle="Já estão disponíveis todos os relatórios de manuntenção de 2019 com todas as informações técnicas de recall"
          backgroundImage="http://equatusvehicleservices.co.uk/wp-content/uploads/2017/03/mechanical-repairs-700x400.jpg"
        />
      </AutoRotatingCaorusel>
    </div>
  ))
  .add('carousel multiple', () => (
    <div style={{ width: '700px', height: '400px' }}>
      <AutoRotatingCaorusel>
        <Slide
          link="http://www.google.com.br"
          titleImage="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/100px-BMW.svg.png"
          title="Relatório de Manuntenção BMW 2019"
          subtitle="Já estão disponíveis todos os relatórios de manuntenção de 2019 com todas as informações técnicas de recall"
          backgroundImage="http://equatusvehicleservices.co.uk/wp-content/uploads/2017/03/mechanical-repairs-700x400.jpg"
        />

        <Slide
          titleImage="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/100px-BMW.svg.png"
          title="Comitê Geral Seleciona Integrantes"
          subtitle="O comitê geral elegeu os novos membros para o Premium Selection"
          backgroundImage="https://autonesian.com/wp-content/uploads/2017/02/astra-autoprima-bmw-2-700x400.jpg"
        />
      </AutoRotatingCaorusel>
    </div>
  ));
