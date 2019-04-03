import React from 'react';
import PropTypes from 'prop-types';
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
  onAccept,
  onReject,
  onDelete,
}) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          borderRadius: '2px',
          border: '1px dashed #80808070',
          backgroundColor: '#8080801c',
          minWidth: '50%',
        }}
      >
        <Uploader
          value={value}
          acceptedFormat={acceptedFormat}
          filesLimit={filesLimit}
          maxFileSize={maxFileSize}
          title={title}
          buttonLabel={buttonLabel}
          onAccept={onAccept}
          onReject={onReject}
          subtitle={subtitle}
        />
      </div>

      <div
        style={{
          marginLeft: '3%',
          width: '47%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <PreviewList value={value} onDelete={onDelete} />
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
  onAccept: null,
  onReject: null,
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
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  onDelete: PropTypes.func,
};
