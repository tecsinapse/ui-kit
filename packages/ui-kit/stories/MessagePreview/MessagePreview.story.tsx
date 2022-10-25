import * as React from 'react';
import { ArgsTable, Description, Title } from '@storybook/addon-docs/blocks';
import { MessagePreview } from 'components/MessagePreview';
import { DivFlex } from 'components/DivFlex';
import { GROUPS } from 'hierarchySeparators';
import { Grid, TextField } from '@material-ui/core';
import { useState } from 'react';
import { Divider, Input } from '../../build';

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
          <Description>Preview model message whatsapp for wingo fluxos and wingo chat</Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => {
  const { unformattedMessage, buttons } = args;
  const [field, setField] = useState(unformattedMessage || "");

  const handleSetField = (event) => setField(event.target.value);

  return (
    <Grid
      container
      alignContent="center"
      justify="center"
      alignItems="center"
      direction="row"
      spacing={2}
      style={{ height: '500px' }}
    >
      <Grid item>
        <MessagePreview unformattedText={field} buttons={buttons} />
      </Grid>
      <Grid item xs={12}>
        <Divider variant="solid" />
      </Grid>
      <Grid item>
        <Input
          multiline
          placeholder="Texto da mensagem"
          name="Texto da mensagem"
          type="text"
          onChange={event => handleSetField(event)}
          value={field}
        />
      </Grid>
    </Grid>
  );
};

Base.args = {
  /** plain message */
  unformattedMessage: '\uD83D\uDEA6 *CONFIRMAÇÃO DE AGENDAMENTO - {{1}}*\n\nOlá {{2}},\n{{1}} agradece sua preferência! \uD83D\uDE98\n\nTemos um horário agendado para o dia {{3}}\n{{4}}\nPodemos Confirmar?',
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
  ]
};
