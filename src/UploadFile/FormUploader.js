import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Uploader } from './Uploader';
import { PreviewList } from './PreviewList';

export function FormUploader({
  value,
  acceptedFormat,
  filesLimit,
  maxFileSize,
  title,
  buttonLabel,
  subtitle,
  onChange,
  onDelete,
}) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'stretch',
      }}
    >
      <div
        style={{
          flexBasis: '50%',
          flexShrink: '1',
          width: '500px',
        }}
      >
        <Uploader
          value={value}
          acceptedFormat={acceptedFormat}
          filesLimit={filesLimit}
          maxFileSize={maxFileSize}
          title={title}
          buttonLabel={buttonLabel}
          onChange={onChange}
          subtitle={subtitle}
        />
      </div>
      <div
        style={{
          flexBasis: '50%',
        }}
      >
        <Typography variant="h5">Upload Files</Typography>
        <div style={{ width: '450px' }}>
          <PreviewList value={value} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
}

FormUploader.defaultProps = {
  value: {},
  acceptedFormat: ['image/*', 'video/*', 'application/*'],
  filesLimit: 3,
  maxFileSize: 3000000,
  title: 'Drag and drop a file',
  buttonLabel: 'Upload Files',
  subtitle: 'or click on the button',
  onChange: null,
  onDelete: null,
};

FormUploader.propTypes = {
  acceptedFormat: PropTypes.array,
  filesLimit: PropTypes.number,
  maxFileSize: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  buttonLabel: PropTypes.string,
  value: PropTypes.shape({
    uid: PropTypes.number,
    file: PropTypes.object,
    completed: PropTypes.number,
    uprate: PropTypes.number,
    error: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};
