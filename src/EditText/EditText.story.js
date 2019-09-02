import React from 'react';
import { storiesOf } from '@storybook/react';

import { EditText } from './EditText';
import { DivFlex } from '../withFlexCenter';

storiesOf(`EditText`, module)
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('EditText', () => (
    <div style={{ width: '700px', height: '500px' }}>
      <EditText onChange={e => e /* console.log(e) */} error="" />
    </div>
  ));
