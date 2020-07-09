import React from 'react';
import { storiesOf } from '@storybook/react';
import { Description, Title } from '@storybook/addon-docs/dist/blocks';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { DivFlex } from '..';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  code: {
    lineHeight: 1,
    margin: '0 2px',
    padding: '3px 5px',
    whiteSpace: 'nowrap',
    borderRadius: '3px',
    border: '1px solid #EEEEEE',
    color: 'rgba(51,51,51,0.9)',
    backgroundColor: '#F8F8F8',
    textTransform: 'lowercase',
    letterSpacing: 0,
  },
});

export function Types() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1" gutterBottom>
        <code className={classes.code}>h1</code>: Heading
      </Typography>
      <Typography variant="h2" gutterBottom>
        <code className={classes.code}>h2</code>: Heading
      </Typography>
      <Typography variant="h3" gutterBottom>
        <code className={classes.code}>h3</code>: Heading
      </Typography>
      <Typography variant="h4" gutterBottom>
        <code className={classes.code}>h4</code>: Heading
      </Typography>
      <Typography variant="h5" gutterBottom>
        <code className={classes.code}>h5</code>: Heading
      </Typography>
      <Typography variant="h6" gutterBottom>
        <code className={classes.code}>h6</code>: Heading
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <code className={classes.code}>subtitle1</code>: Lorem ipsum dolor sit
        amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        <code className={classes.code}>subtitle2</code>: Lorem ipsum dolor sit
        amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </Typography>
      <Typography variant="body1" gutterBottom>
        <code className={classes.code}>body1</code>: Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit,
        quam beatae rerum inventore consectetur, neque doloribus, cupiditate
        numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography variant="body2" gutterBottom>
        <code className={classes.code}>body2</code>: Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit,
        quam beatae rerum inventore consectetur, neque doloribus, cupiditate
        numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        <code className={classes.code}>button</code>: button text
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        <code className={classes.code}>caption</code>: caption text
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        <code className={classes.code}>overline</code>: overline text
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

storiesOf(`A Introduction`, module)
  .addParameters({
    component: Types,
    docs: {
      disable: true,
      page: () => (
        <>
          <Title>Typography</Title>
          <Description>
            The `Typography` component can receive the variant options seen on
            canvas tab.
          </Description>
        </>
      ),
    },
  })
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('Typography', () => <TypesExample />);
