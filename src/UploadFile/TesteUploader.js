import React, { useState } from 'react';
import uniqid from 'uniqid';
import { setInterval, clearInterval } from 'timers';
import { Uploader } from './Uploader';

export function TesteUploader() {
  const [files, setFiles] = useState({});

  function DummyUploader(copyFiles, uid) {
    const newCopyFile = copyFiles;
    const timer = setInterval(() => {
      newCopyFile[uid] = {
        file: newCopyFile[uid].file,
        completed: newCopyFile[uid].completed + Math.random() * 10,
      };

      if (newCopyFile[uid].completed >= 100) {
        clearInterval(timer);
      }

      setFiles(newCopyFile);
    }, 500);
  }

  const onNewFiles = newFiles => {
    const copyFiles = { ...files };
    newFiles.forEach(file => {
      const uid = uniqid();

      copyFiles[uid] = {
        file,
        completed: 0,
      };

      setFiles(copyFiles);

      DummyUploader(copyFiles, uid);
    });
  };

  return (
    <Uploader
      value={files}
      dropzoneText="Arraste ou selecione seus arquivos de upload"
      onChange={onNewFiles}
    />
  );
}
