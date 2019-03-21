import React, { useState } from 'react';
import uniqid from 'uniqid';
import { setInterval, clearInterval } from 'timers';
import { Uploader } from './Uploader';

export function TesteUploader() {
  const [files, setFiles] = useState({});

  function DummyUploader(uid) {
    const timer = setInterval(
      () =>
        setFiles(prevFiles => {
          const copyFiles = { ...prevFiles };

          if (copyFiles[uid] === null) return prevFiles;

          copyFiles[uid] = {
            data: copyFiles[uid].data,
            file: copyFiles[uid].file,
            completed: copyFiles[uid].completed + Math.random() * 10,
            uprate: Math.random() * 10 * 1000,
            uploader: timer,
          };

          if (copyFiles[uid].completed >= 100) {
            clearInterval(timer);
          }

          return copyFiles;
        }),
      800
    );
  }

  const onNewFiles = newFiles => {
    const copyFiles = { ...files };
    newFiles.forEach(file => {
      const reader = new FileReader();
      const uid = uniqid();

      // Set state after reading async the files
      reader.onload = event => {
        copyFiles[uid] = {
          file,
          data: event.target.result,
          completed: 0,
          uprate: Math.random() * 10 * 1000,
          uploader: null,
        };
        setFiles(copyFiles);
        DummyUploader(uid);
      };
      reader.readAsDataURL(file);
    });
  };

  const onDeleteFiles = fileUID => {
    const copyFiles = { ...files };

    // Note: Before update the state (excluding),
    // this example should stop the upload process (dummy here)
    clearInterval(copyFiles[fileUID].uploader);

    // Update state
    delete copyFiles[fileUID];
    setFiles(copyFiles);
  };

  return (
    <Uploader
      value={files}
      onChange={onNewFiles}
      filesLimit={3}
      onDelete={onDeleteFiles}
    />
  );
}
