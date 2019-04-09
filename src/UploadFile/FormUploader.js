import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Uploader } from './Uploader';
import { PreviewList } from './PreviewList';

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  uploader: {
    borderRadius: '2px',
    border: '1px dashed #80808070',
    backgroundColor: '#f7f7f7',
    minWidth: '50%',
  },
  preview: {
    [theme.breakpoints.down('xs')]: {
      marginTop: '3%',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '3%',
    },
    width: '47%',
    display: 'flex',
    flexDirection: 'column',
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
}) {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <div className={classes.uploader}>
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

      <div className={classes.preview}>
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
