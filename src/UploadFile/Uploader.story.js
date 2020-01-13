import React, { useRef } from 'react';
import { storiesOf } from '@storybook/react';

import { Description, Props, Title } from '@storybook/addon-docs/dist/blocks';
import { TesteUploader } from './TesteUploader';
import { Button } from '../Buttons/Button';
import { DivFlex } from '../withFlexCenter';
import { Uploader } from './Uploader';
import { FormUploader } from './FormUploader';

const SilentUploadExample = () => {
  const fancyRef = useRef();
  return (
    <div>
      <Button
        onClick={() => {
          fancyRef.current.open();
        }}
        customVariant="success"
        variant="contained"
      >
        Upload
      </Button>
      <TesteUploader silent ref={fancyRef} />
    </div>
  );
};
storiesOf(`Uploader`, module)
  .addParameters({
    subcomponents: {
      Uploader,
      FormUploader,
    },
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            The `Uploader` component can receive the following props:
          </Description>
          <Props />
        </>
      ),
    },
  })
  .addDecorator(story => <DivFlex>{story()}</DivFlex>)
  .add('uploader drag', () => (
    <div style={{ width: '700px', height: '400px' }}>
      <TesteUploader />
    </div>
  ))
  .add('uploader form', () => (
    <div style={{ width: '800px', height: '500px' }}>
      <TesteUploader type="form" />
    </div>
  ))
  .add('uploader silent', () => <SilentUploadExample />);
