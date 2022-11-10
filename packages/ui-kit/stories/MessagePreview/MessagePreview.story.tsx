import * as React from 'react';
import { ArgsTable, Description, Title } from '@storybook/addon-docs/blocks';
import { MessagePreview } from 'components/MessagePreview';
import { DivFlex } from 'components/DivFlex';
import { GROUPS } from 'hierarchySeparators';
import { Grid } from '@material-ui/core';

export default {
  title: `${GROUPS.COMPONENTS}/MessagePreview`,
  component: MessagePreview,
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
            Preview model message whatsapp for wingo fluxos and wingo chat
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const { unformattedText, buttons, media, header, footer } = args;

  return (
    <Grid item xs={6}>
      <Grid
        container
        alignContent="center"
        alignItems="center"
        justify="center"
        direction="column"
      >
        <Grid item xs={6}>
          <MessagePreview
            unformattedText={unformattedText}
            buttons={buttons}
            media={media}
            header={header}
            footer={footer}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

Base.args = {
  /** plain message */
  unformattedText:
    '\uD83D\uDEA6 *CONFIRMAÇÃO DE AGENDAMENTO - {{1}}*\n\nOlá {{2}},\n{{1}} agradece sua preferência! \uD83D\uDE98\n\nTemos um horário agendado para o dia {{3}}\n{{4}}\nPodemos Confirmar?',
  /** buttons of message*/
  buttons: [
    {
      position: 1,
      description: 'Sim, por favor',
    },
    {
      position: 2,
      description: 'Não eu não',
    },
    {
      position: 3,
      description: 'Encerrar',
    },
  ],
  media:
    'https://quatrorodas.abril.com.br/wp-content/uploads/2016/11/5658cb0e52657372a136b3a8novofocus2016-se1-6-39.jpeg?quality=70&strip=all',
  header: undefined,
  footer: undefined,
};
