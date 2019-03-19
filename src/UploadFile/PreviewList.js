import React from 'react';
import List from '@material-ui/core/List';
import { convertBytes } from './helper';

import { UpFile } from './UpFile';

export function PreviewList({ value }) {
  return (
    <List>
      {Object.keys(value).map((uid, i) => (
        <UpFile
          key={uid}
          filename={value[uid].file.name}
          completed={value[uid].completed}
          filesize={convertBytes(value[uid].file.size)}
          uprate={`${convertBytes(value[uid].uprate)}/sec`}
          divider={Object.keys(value).length !== i + 1}
        />
      ))}
    </List>
  );
}
