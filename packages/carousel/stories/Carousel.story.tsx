import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { AutoRotatingCarousel } from 'Carousel/AutoRotatingCarousel/AutoRotatingCarousel';
import { DivFlex } from '@tecsinapse/ui-kit';
import { Slide } from 'Carousel/Slide/Slide';

export default {
  title: `Packages @tecsinapse/carousel`,
  component: AutoRotatingCarousel,
  subcomponents: { Slide },
  decorators: [
    Story => (
      <DivFlex>
        <Story />
      </DivFlex>
    ),
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            A Carousel is composed by Slides. The `AutoRotatingCarousel` and
            `Slide` components can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Single = args => {
  const style = { width: '700px', height: '400px' };

  return (
    <div style={style}>
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
  );
};

Single.args = {
  autoplay: false,
};

export const Multiple = args => {
  const style = { width: '700px', height: '400px' };
  return (
    <div style={style}>
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
  );
};

Multiple.args = {
  autoplay: true,
};
