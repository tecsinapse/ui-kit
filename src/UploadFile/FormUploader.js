import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
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
  title,
  buttonLabel,
  subtitle,
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
  } else if (variant === 'mobile') mobile = true;

  return (
    <div
      className={classNames(classes.root, {
        [classes.rootmobile]: mobile,
      })}
    >
      <div
        className={classNames(classes.uploader, {
          [classes.uploadermobile]: mobile,
        })}
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
        className={classNames(classes.preview, {
          [classes.previewmobile]: mobile,
        })}
      >
        <PreviewList
          value={value}
          onDelete={onDelete}
          headerLabel={headerLabel}
          noFileBottomLabel={noFileBottomLabel}
          noFileTopLabel={noFileTopLabel}
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
  title: 'Drag and drop a file',
  buttonLabel: 'Upload Files',
  subtitle: 'or click on the button',
  onAccept: null,
  onReject: null,
  onDelete: null,
  variant: 'auto',
  headerLabel: 'Uploading Files',
  noFileTopLabel: 'Upload Files',
  noFileBottomLabel: 'Appear Here',
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
  variant: PropTypes.oneOf(['auto', 'mobile', 'web']),
  headerLabel: PropTypes.string,
  noFileBottomLabel: PropTypes.string,
  noFileTopLabel: PropTypes.string,
};
