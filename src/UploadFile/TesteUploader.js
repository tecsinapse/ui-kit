import React, { useState } from 'react';
import uniqid from 'uniqid';
import { setInterval, clearInterval } from 'timers';
import Uploader from './Uploader';

function TesteUploader() {
  const [files, setFiles] = useState([{}]);

  function DummyUploader(uid) {
    const timer = setInterval(() => {
      const copyFiles = { ...files };
      copyFiles[uid] = {
        uid,
        file: copyFiles[uid].file,
        completed: copyFiles[uid].completed + 5,
      };

      if (copyFiles[uid].completed >= 100) {
        clearInterval(timer);
      }

      setFiles(copyFiles);
    }, 500);
  }

  const onNewFiles = newFiles =>
    newFiles.forEach(file => {
      const copyFiles = { ...files };
      const uid = uniqid();
      copyFiles[uid] = {
        uid,
        file,
        completed: 0,
      };
      setFiles(copyFiles);

      DummyUploader(uid);
    });

  return (
    <Uploader
      value={files}
      dropzoneText="Arraste ou selecione seus arquivos de upload"
      onChange={onNewFiles}
    />
  );
}

export default TesteUploader;
