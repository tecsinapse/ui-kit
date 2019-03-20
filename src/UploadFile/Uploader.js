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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // border: '2px dashed blue',
  },
  drag: {
    borderStyle: 'dashed',
    width: '100%',
    height: '75%',
    position: 'relative',
    border: '2px dashed grey',
    borderRadius: '6px',
    backgroundColor: '#80808021',
    flexBasis: '40%',
  },
  preview: {
    // border: '2px dashed red',
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    flexBasis: '55%',
  },
  dropzoneText: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    // border: '2px dashed red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  icon: {
    // border: '2px dashed blue',
    width: '100%',
    flexBasis: '25%',
  },
  text: {
    // border: '2px dashed green',
    flexBasis: '25%',
  },
});

export function Uploader({
  value,
  acceptedFormat,
  filesLimit,
  maxFileSize,
  dropzoneText,
  onChange,
  onDelete,
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
          <CloudUploadIcon fontSize="large" className={classes.icon} />
          <Typography variant="h5" className={classes.text}>
            {dropzoneText}
          </Typography>
        </div>
      </div>
      <div className={classes.preview}>
        <PreviewList value={value} onDelete={onDelete} />
      </div>
    </div>
  );
}

Uploader.defaultProps = {
  value: {},
  acceptedFormat: ['image/*', 'video/*', 'application/*'],
  filesLimit: 3,
  maxFileSize: 3000000,
  dropzoneText: 'Drag and drop a file here or click',
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
