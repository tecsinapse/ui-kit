import React from 'react';
import { storiesOf } from '@storybook/react';

import { Description, Title } from '@storybook/addon-docs/dist/blocks';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { FullScreenLoading } from './FullscreenLoading';

storiesOf(`${GROUPS.LOADINGS}|Fullscreen Loading`, module)
  .addParameters({
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            The `FullScreenLoading` component receive only one prop named as
            `show` to display the spinning circle.
          </Description>
        </>
      ),
    },
  })
  .add('Fullscreen Loading', () => <FullScreenLoading show />);
