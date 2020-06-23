import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Uploader } from './Uploader';
import { PreviewList } from './PreviewList';

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  rootmobile: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  uploader: {
    borderRadius: '2px',
    border: '1px dashed #80808070',
    backgroundColor: '#f7f7f7',
    minWidth: '50%',
    overwride: 'hidden',
  },
  uploadermobile: {
    width: '100%',
  },
  preview: {
    marginLeft: '3%',
    width: '47%',
    display: 'flex',
    flexDirection: 'column',
    overwride: 'hidden',
  },
  previewmobile: {
    marginLeft: '0px',
    width: '100%',
  },
}));

export function FormUploader({
  value,
  acceptedFormat,
  filesLimit,
  maxFileSize,
  messages,
  onAccept,
  onReject,
  onDelete,
  variant,
  headerLabel,
  noFileTopLabel,
  noFileBottomLabel,
}) {
  const classes = useStyle();

  const matches = useMediaQuery(useTheme().breakpoints.down('xs'));

  let mobile = false;
  if (variant === 'auto') {
    if (matches) {
      mobile = true;
    }
  } else if (variant === 'mobile') {
    mobile = true;
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.rootmobile]: mobile,
      })}
    >
      <div
        className={clsx(classes.uploader, {
          [classes.uploadermobile]: mobile,
        })}
      >
        <Uploader
          value={value}
          acceptedFormat={acceptedFormat}
          filesLimit={filesLimit}
          maxFileSize={maxFileSize}
          messages={messages}
          onAccept={onAccept}
          onReject={onReject}
        />
      </div>

      <div
        className={clsx(classes.preview, {
          [classes.previewmobile]: mobile,
        })}
      >
        <PreviewList
          value={value}
          onDelete={onDelete}
          headerLabel={headerLabel}
          noFileBottomLabel={noFileBottomLabel}
          noFileTopLabel={noFileTopLabel}
          messages={messages}
        />
      </div>
    </div>
  );
}

FormUploader.defaultProps = {
  value: {},
  acceptedFormat: ['image/*', 'video/*', 'application/*'],
  filesLimit: 3,
  maxFileSize: 3000000,
  onAccept: null,
  onReject: null,
  onDelete: null,
  variant: 'auto',
  headerLabel: 'Uploading Files',
  noFileTopLabel: 'Upload Files',
  noFileBottomLabel: 'Appear Here',
  messages: {
    maximumFileLimitMessage: limit =>
      `Maximum allowed number of files exceeded. Only ${limit} allowed`,
    maximumFileNumberMessage: 'Maximum allowed number of files',
    filenameFailedMessage: name => `${name} failed. `,
    filetypeNotSupportedMessage: 'File type not supported. ',
    sizeLimitErrorMessage: size => `Size limit ${size}.`,
    undefinedErrorMessage: 'Undefined error',
    title: 'Drag and drop a file',
    buttonLabel: 'Upload Files',
    subtitle: 'or click on the button',
    fileRemovedMessage: 'File removed from upload list',
    fileUploadedSucessfullyMessage: filename =>
      `${filename} uploaded successfully`,
    fileErroedMessage: (filename, error) => `${filename} error: ${error}`,
  },
};

FormUploader.propTypes = {
  acceptedFormat: PropTypes.array,
  filesLimit: PropTypes.number,
  maxFileSize: PropTypes.number,
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
  variant: PropTypes.oneOf(['auto', 'mobile', 'web']),
  /** Header label displayed on form uploader */
  headerLabel: PropTypes.string,
  /** Bottom label displayed on form uploader when empty */
  noFileBottomLabel: PropTypes.string,
  /** Top label displayed on form uploader when empty */
  noFileTopLabel: PropTypes.string,
  /** Messages object to the user */
  messages: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    buttonLabel: PropTypes.string,
    filetypeNotSupportedMessage: PropTypes.string,
    undefinedErrorMessage: PropTypes.string,
    maximumFileLimitMessage: PropTypes.func,
    filenameFailedMessage: PropTypes.func,
    sizeLimitErrorMessage: PropTypes.func,
    fileRemovedMessage: PropTypes.string,
    fileUploadedSucessfullyMessage: PropTypes.func,
    fileErroedMessage: PropTypes.func,
  }),
};
