import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  Description,
  Props,
  Source,
  Title,
} from '@storybook/addon-docs/dist/blocks';
import { DivFlex } from './withFlexCenter';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

export function Palette() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="primary.main" color="primary.contrastText" p={2}>
          primary.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="secondary.main" color="secondary.contrastText" p={2}>
          secondary.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="error.main" color="error.contrastText" p={2}>
          error.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="warning.main" color="warning.contrastText" p={2}>
          warning.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="info.main" color="info.contrastText" p={2}>
          info.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="success.main" color="success.contrastText" p={2}>
          success.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="text.primary" color="background.paper" p={2}>
          text.primary
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="text.secondary" color="background.paper" p={2}>
          text.secondary
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="text.disabled" color="background.paper" p={2}>
          text.disabled
        </Box>
      </Grid>
    </Grid>
  );
}
const style = { minWidth: '100%' };

const PaletteExample = () => (
  <div style={style}>
    <Palette />
  </div>
);

storiesOf(`${GROUPS.FORMS}|Palette`, module)
  .addParameters({
    component: Palette,
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            The `BackgroundColor` component can receive the following props:
          </Description>
          <Props />
          <Title>Code snippets</Title>
          <Description>
            Here you can check the code snippet for the story.
          </Description>
          <Source
            code={`
              () => {
                return (
                  <PaletteExample/>
                );
              }
            `}
          />
        </>
      ),
    },
  })
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Palette', () => <PaletteExample />);
