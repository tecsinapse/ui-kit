import React from 'react';
import { storiesOf } from '@storybook/react';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { FullScreenLoading } from './FullscreenLoading';

storiesOf(`${GROUPS.LOADINGS}|FullscreenLoading`, module).add(
  'Fullscreen Loading',
  () => <FullScreenLoading show />
);
