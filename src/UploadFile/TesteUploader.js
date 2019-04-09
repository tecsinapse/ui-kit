import React, { useState } from 'react';
import uniqid from 'uniqid';
import { setInterval, clearInterval } from 'timers';
import Dialog from '@material-ui/core/Dialog';
import { Uploader } from './Uploader';
import { PreviewList } from './PreviewList';
import { FormUploader } from './FormUploader';

export function TesteUploader({ type }) {
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

  const onAccept = newFiles => {
    setOpen(true);
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
          uploader: null,
          error: null,
        };
        setFiles(copyFiles);

        // Dummy uploader update the file upload values and fake a
        // a error when it has added more than 2 files
        DummyUploader(uid, Object.keys(copyFiles).length > 2);
      };
      reader.readAsDataURL(file);
    });
  };

  const onReject = newFiles => {
    setOpen(true);
    const copyFiles = { ...files };
    newFiles.forEach(fileObj => {
      const uid = uniqid();

      copyFiles[uid] = {
        file: fileObj.file,
        data: null,
        completed: 0,
        uploader: null,
        error: fileObj.error,
      };
      setFiles(copyFiles);

      // Dummy uploader update the file upload values and fake a
      // a error when it has added more than 2 files
      // if (!fileObj.error) DummyUploader(uid, Object.keys(copyFiles).length > 2);
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
      {type !== 'form' ? (
        <React.Fragment>
          <Uploader
            value={files}
            onAccept={onAccept}
            onReject={onReject}
            filesLimit={3}
          />
          <Dialog
            onClose={() => setOpen(false)}
            open={open}
            aria-labelledby="simple-dialog-title"
          >
            <div
              style={{
                width: '450px',
                height: '340px',
                paddingLeft: '10px',
                paddingRight: '10px',
              }}
            >
              <PreviewList value={files} onDelete={onDeleteFiles} />
            </div>
          </Dialog>
        </React.Fragment>
      ) : (
        <FormUploader
          value={files}
          onAccept={onAccept}
          onReject={onReject}
          onDelete={onDeleteFiles}
        />
      )}
    </React.Fragment>
  );
}
