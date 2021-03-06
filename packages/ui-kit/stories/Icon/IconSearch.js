import React, { useState } from 'react';
import Icon from '@mdi/react';
import * as Icons from '@mdi/js';
import { Input } from 'components/Inputs';
/* eslint-disable */

const IconWrapper = ({ iconPath, path }) => (
  <div
    title={path}
    onClick={() => {
      navigator.clipboard
        .writeText(
          `
            import { ${path} } from '@mdi/js';
            import Icon from '@mdi/react';
            <Icon path={${path}} size={1} />
          `
        )
        .then(
          () => {
            alert('Copied to clipboard successfully!');
          },
          () => {
            alert('Unable to write to clipboard');
          }
        );
    }}
  >
    <Icon path={iconPath} key={path} size={1} />
  </div>
);

export function IconSearch() {
  const [value, setValue] = useState('');
  return (
    <div
      style={{
        maxWidth: 'auto',
      }}
    >
      <Input
        name={'icone'}
        label="Busque um ícone"
        value={value}
        fullWidth
        onChange={e => setValue(e.target.value)}
        style={{ marginTop: '8px' }}
      />
      <hr />
      <div
        style={{
          height: 'auto',
          minWidth: '100%',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            flexWrap: 'wrap',
            display: 'flex',
            minWidth: '100%',
          }}
        >
          {Object.keys(Icons)
            .filter(
              path =>
                value === '' || path.toLowerCase().includes(value.toLowerCase())
            )
            .map(iconPath => (
              <IconWrapper
                iconPath={Icons[iconPath]}
                key={iconPath}
                path={iconPath}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

/*
storiesOf(`${GROUPS.COMPONENTS}|Icon`, module)
  .addParameters({
    docs: {
      disable: true,
      page: () => (
        <>
          <Title />
          <Description>
            Icons can be used in any component you want. All you have to do is
            to import just like in the story canvas source.
          </Description>
        </>
      ),
    },
  })
  .add('Icon', () => {
    return (
      <div>
        <IconSearch />
      </div>
    );
  });
*/
