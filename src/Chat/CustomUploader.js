import React, {forwardRef, useState} from 'react';
import uniqid from 'uniqid';
import IconButton from '@material-ui/core/IconButton';
import { mdiPaperclip } from '@mdi/js';
import Icon from '@mdi/react';


import {Uploader} from '../UploadFile/Uploader';

export const CustomUploader = forwardRef(
  ({files, setFiles, mediaType}, ref) => {

    const onAccept = newFiles => {
        const copyFiles = { ...files };
        newFiles.forEach(file => {
        const reader = new FileReader();
        const uid = uniqid();
            console.log(newFiles);
        // Create preview tag
        reader.onload = event => { 
        copyFiles[uid] = {
            mediaType,
            data: event.target.result,
            name: file.name,
          };

          setFiles(copyFiles);
        }
            reader.readAsDataURL(file);
        });
    }

    const messages = {
      maximumFileLimitMessage: limit => `Apenas ${limit} arquivo(s) podem ser enviados por vez`,
    };

    return (
      <React.Fragment>
        <Uploader
          value={files}
          onAccept={onAccept}
          filesLimit={3}
          silent
          ref={ref}
          messages={messages}
          acceptedFormat={[mediaType]}
        />
      </React.Fragment>
    );
  }
);
