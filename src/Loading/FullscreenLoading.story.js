import React from 'react';
import { storiesOf } from '@storybook/react';
import {muiTheme} from 'storybook-addon-material-ui';
import { createMuiTheme } from '@material-ui/core/styles';
import { GROUPS } from '../../.storybook/hierarchySeparators';
import { FullScreenLoading } from './FullscreenLoading';

storiesOf(`${GROUPS.LOADINGS}|FullscreenLoading`, module)
.addDecorator(muiTheme(createMuiTheme({spacing: 1})))
.add(
  'Fullscreen Loading',
  () => <FullScreenLoading show />
);
