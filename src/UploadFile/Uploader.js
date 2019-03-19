import React from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { PreviewList } from './PreviewList';

const useStyle = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    border: '2px dashed blue',
  },
  drag: {
    borderStyle: 'dashed',
    width: '90%',
    height: '80%',
    position: 'relative',
    border: '2px dashed grey',
    borderRadius: '6px',
    backgroundColor: '#80808021',
  },
  preview: {
    border: '2px dashed red',
    width: '100%',
    height: '100%',
    overflow: 'scroll',
  },
  dropzoneText: {
    position: 'absolute',
    top: '40%',
    left: '8%',
    textAlign: 'center',
  },
});

export function Uploader({
  value,
  acceptedFormat,
  filesLimit,
  maxFileSize,
  dropzoneText,
  onChange,
}) {
  const classes = useStyle();

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedFormat.join(','),
    maxSize: maxFileSize,
    onDrop: acceptedFiles => {
      if (
        acceptedFiles.length + Object.keys(value).length <= filesLimit &&
        onChange
      ) {
        onChange(acceptedFiles);
      }
      // TODO (LIP): Define what it should happen for ignored files
    },
  });

  return (
    <div className={classes.root}>
      <div {...getRootProps()} className={classes.drag}>
        <input {...getInputProps()} />

        <div className={classes.dropzoneText}>
          <Typography variant="Subheading">{dropzoneText}</Typography>
          <CloudUploadIcon fontSize="large" />
        </div>
      </div>
      <div className={classes.preview}>
        <PreviewList value={value} />
      </div>
    </div>
  );
}

Uploader.defaultProps = {
  value: {},
  acceptedFormat: ['image/*', 'video/*', 'application/*'],
  filesLimit: 3,
  maxFileSize: 3000000,
  dropzoneText: 'Drag and drop an image file here or click',
  onChange: () => {},
};

Uploader.propTypes = {
  acceptedFormat: PropTypes.array,
  filesLimit: PropTypes.number,
  maxFileSize: PropTypes.number,
  dropzoneText: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.shape({
    uid: PropTypes.number,
    file: PropTypes.object,
    completed: PropTypes.number,
    uprate: PropTypes.number,
  }),
};
