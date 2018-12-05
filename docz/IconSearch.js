/* eslint-disable */

import Icon from '@mdi/react';
import * as Icons from '@mdi/js';
import React, { useState } from 'react';
import { Input } from '../src/Inputs/Input';

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

export default function IconSearch() {
  const [value, setValue] = useState('');
  return (
    <div>
      <Input
        label="Busque um ícone"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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
  );
}
