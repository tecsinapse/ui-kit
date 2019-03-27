import React, { useState } from 'react';
import uniqid from 'uniqid';
import { setInterval, clearInterval } from 'timers';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Uploader } from './Uploader';
import { PreviewList } from './PreviewList';

export function TesteUploader() {
  const [files, setFiles] = useState({});
  const [open, setOpen] = useState(false);

  function DummyUploader(uid, dummyError) {
    const timer = setInterval(
      () =>
        setFiles(prevFiles => {
          const copyFiles = { ...prevFiles };

          if (copyFiles[uid] === null) return prevFiles;

          copyFiles[uid] = {
            data: copyFiles[uid].data,
            file: copyFiles[uid].file,

            // Only update completed when there isn't an error, otherwise it
            // will continue to load the bar in an error state though.
            completed:
              copyFiles[uid].completed > 50 && dummyError
                ? copyFiles[uid].completed
                : copyFiles[uid].completed + Math.random() * 10,

            uploader: timer,

            // Verify if this dummy example should enter in an error state
            error:
              copyFiles[uid].completed > 50 && dummyError
                ? 'Dummy error'
                : null,
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
    setOpen(true);
    const copyFiles = { ...files };
    newFiles.forEach(fileObj => {
      let f = null;
      let e = null;
      if (fileObj.error) {
        f = fileObj.file;
        e = fileObj.error;
      } else {
        f = fileObj;
      }
      const reader = new FileReader();
      const uid = uniqid();

      // Set state after reading async the files
      reader.onload = event => {
        copyFiles[uid] = {
          file: f,
          data: event.target.result,
          completed: 0,
          uploader: null,
          error: e,
        };
        setFiles(copyFiles);

        // Dummy uploader update the file upload values and fake a
        // a error when it has added more than 2 files
        if (!e) DummyUploader(uid, Object.keys(copyFiles).length > 2);
      };
      reader.readAsDataURL(f);
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
    <React.Fragment>
      <Uploader value={files} onChange={onNewFiles} filesLimit={3} />
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        aria-labelledby="simple-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Upload Files</DialogTitle>
        <PreviewList value={files} onDelete={onDeleteFiles} />
      </Dialog>
    </React.Fragment>
  );
}
