import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  Description,
  Props,
  Source,
  Title,
} from '@storybook/addon-docs/dist/blocks';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { DivFlex } from '../components/DivFlex/DivFlex';
import { GROUPS } from '../../../../.storybook/hierarchySeparators';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
});

export function Types() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1" component="h2" gutterBottom>
        h1. Heading
      </Typography>
      <Typography variant="h2" gutterBottom>
        h2. Heading
      </Typography>
      <Typography variant="h3" gutterBottom>
        h3. Heading
      </Typography>
      <Typography variant="h4" gutterBottom>
        h4. Heading
      </Typography>
      <Typography variant="h5" gutterBottom>
        h5. Heading
      </Typography>
      <Typography variant="h6" gutterBottom>
        h6. Heading
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </Typography>
      <Typography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        button text
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        caption text
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        overline text
      </Typography>
    </div>
  );
}

const style = { minWidth: '100%' };

const TypesExample = () => (
  <div style={style}>
    <Types />
  </div>
);

storiesOf(`${GROUPS.FORMS}|Typography`, module)
  .addParameters({
    component: Types,
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            The `Types` component can receive the following props:
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
                  <Types/>
                );
              }
            `}
          />
        </>
      ),
    },
  })
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Typography', () => <TypesExample />);
