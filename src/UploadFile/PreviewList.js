import React, { useState } from 'react';
import List from '@material-ui/core/List';
import { convertBytes } from './helper';
import { ConfirmationAlert } from '../Alerts/ConfirmationAlert';
import { UpFile } from './UpFile';

export function PreviewList({ value, onDelete }) {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedUID, setSelectedUID] = useState('');

  return (
    <React.Fragment>
      <ConfirmationAlert
        show={showAlert}
        proceed={() => {
          setShowAlert(false);
          onDelete(selectedUID);
        }}
        cancel={() => {
          setShowAlert(false);
          setSelectedUID('');
        }}
        dismiss={() => {
          setShowAlert(false);
          setSelectedUID('');
        }}
      />

      <List>
        {Object.keys(value).map((uid, i) => (
          <UpFile
            key={uid}
            uid={uid}
            filename={value[uid].file.name}
            completed={value[uid].completed}
            filesize={convertBytes(value[uid].file.size)}
            uprate={`${convertBytes(value[uid].uprate)}/sec`}
            divider={Object.keys(value).length !== i + 1}
            setShowAlert={setShowAlert}
            setSelectedUID={setSelectedUID}
          />
        ))}
      </List>
    </React.Fragment>
  );
}
