import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { PreviewList } from './PreviewList';

function Uploader({
  value,
  acceptedFiles,
  filesLimit,
  maxFileSize,
  dropzoneText,
  onChange,
}) {
  return (
    <Fragment>
      <Dropzone>
        <div>
          <p> dropzoneText </p>
          <CloudUploadIcon />
        </div>
      </Dropzone>
      <PreviewList value={value} />
    </Fragment>
  );
}

Uploader.defaultProps = {
  value: null,
  acceptedFiles: ['image/*', 'video/*', 'application/*'],
  filesLimit: 3,
  maxFileSize: 3000000,
  dropzoneText: 'Drag and drop an image file here or click',
  onChange: () => {},
};

Uploader.propTypes = {
  acceptedFiles: PropTypes.array,
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

export default Uploader;
