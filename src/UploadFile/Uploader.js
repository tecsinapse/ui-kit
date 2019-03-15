import React, { Fragment } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { PreviewList } from './PreviewList';

export function Uploader({
  value,
  acceptedFormat,
  filesLimit,
  maxFileSize,
  dropzoneText,
  onChange,
}) {
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
    <Fragment>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p> {dropzoneText} </p>
        <CloudUploadIcon />
      </div>
      <PreviewList value={value} />
    </Fragment>
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
    _id: PropTypes.number,
    file: PropTypes.object,
    upProgress: PropTypes.number,
  }),
};
