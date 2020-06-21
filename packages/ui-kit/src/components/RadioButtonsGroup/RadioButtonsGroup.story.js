import React from 'react';
import { storiesOf } from '@storybook/react';
import { Description, Props, Source, Title } from '@storybook/addon-docs/dist/blocks';
import { DivFlex } from '../../withFlexCenter';
import { GROUPS } from '../../../../../.storybook/hierarchySeparators';
import { RadioButtonsGroup } from './RadioButtonsGroup';

const style = { minWidth: '100%' };

const Example = () => (
  <div style={style}>
    <RadioButtonsGroup />
  </div>
);

storiesOf(`${GROUPS.FORMS}|RadioButtonsGroup`, module)
  .addParameters({
    component: RadioButtonsGroup,
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            The `RadioButtonsGroup` component can receive the following props:
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
                  <RadioButtonsGroup color="primary" />
                );
              }
            `}
          />
        </>
      ),
    },
  })
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('RadioButtonsGroup', () => <Example />);
