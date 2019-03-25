import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { Snackbar } from '../Notifications/Snackbar';
import { convertBytes } from './helper';
import { Button } from '../Buttons/Button';

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
    // borderStyle: 'dashed',
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    // border: '2px dashed grey',
    // borderRadius: '6px',
    // backgroundColor: '#80808021',
    // flexBasis: '40%',
  },
  preview: {
    // border: '2px dashed red',
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    flexBasis: '55%',
  },
  dropzoneText: {
    // border: '2px dashed red',
    width: '100%',
    height: '100%',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    // border: '2px dashed red',

    // flexBasis: '25%',
  },
  icon: {
    // border: '2px dashed blue',
    alignSelf: 'center',

    height: '60%',
    width: '60%',
    // flexBasis: '25%',
  },
  textDiv: {
    width: '50%',
    height: '50%',
    alignSelf: 'center',
    // border: '2px dashed green',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    // border: '2px dashed blue',
    width: '25%',
    alignSelf: 'center',
  },
});

export function Uploader({
  value,
  acceptedFormat,
  filesLimit,
  maxFileSize,
  dropzoneLabel,
  dropzoneButtonLabel,
  onChange,
}) {
  const [snackbar, setSnackBar] = useState({
    show: false,
    variant: 'error',
    msg: '',
  });
  const classes = useStyle();

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: acceptedFormat.join(','),
    maxSize: maxFileSize,
    onDrop: acceptedFiles => {
      if (
        acceptedFiles.length + Object.keys(value).length <= filesLimit &&
        onChange
      ) {
        onChange(acceptedFiles);
      } else {
        setSnackBar({
          show: true,
          variant: 'error',
          msg: `Maximum allowed number of files exceeded. Only ${filesLimit} allowed`,
        });
      }
    },
    onDropRejected: rejectedFiles => {
      let message = '';
      rejectedFiles.forEach(rejectedFile => {
        message = `File ${rejectedFile.name} was rejected. `;
        if (!acceptedFormat.includes(rejectedFile.type)) {
          message += 'File type not supported. ';
        }
        if (rejectedFile.size > maxFileSize) {
          message += `File is too big. Size limit is ${convertBytes(
            maxFileSize
          )}.`;
        }
      });
      setSnackBar({
        show: true,
        variant: 'error',
        msg: message,
      });
    },
  });

  const rootProps = getRootProps({
    // Disable click and keydown behavior
    onClick: event => event.stopPropagation(),
    onKeyDown: event => {
      if (event.keyCode === 32 || event.keyCode === 13) {
        event.stopPropagation();
      }
    },
  });
  return (
    <React.Fragment>
      <div {...rootProps} className={classes.drag}>
        <input {...getInputProps()} />
        <div className={classes.dropzoneText}>
          <div className={classes.textDiv}>
            <CloudUploadIcon
              fontSize="large"
              color="primary"
              className={classes.icon}
            />
            <Typography
              variant="h5"
              className={classes.text}
              color="textSecondary"
            >
              {dropzoneLabel}
            </Typography>
          </div>

          <Button
            variant="secondary"
            size="large"
            onClick={open}
            className={classes.button}
          >
            {dropzoneButtonLabel}
          </Button>
        </div>
      </div>

      <Snackbar
        show={snackbar.show}
        variant={snackbar.variant}
        onClose={() => setSnackBar({ show: false, variant: 'error' })}
      >
        {snackbar.msg}
      </Snackbar>
    </React.Fragment>
  );
}

Uploader.defaultProps = {
  value: {},
  acceptedFormat: ['image/*', 'video/*', 'application/*'],
  filesLimit: 3,
  maxFileSize: 3000000,
  dropzoneLabel: 'Drag and drop a file',
  dropzoneButtonLabel: 'Select File',
  onChange: () => {},
};

Uploader.propTypes = {
  acceptedFormat: PropTypes.array,
  filesLimit: PropTypes.number,
  maxFileSize: PropTypes.number,
  dropzoneLabel: PropTypes.string,
  dropzoneButtonLabel: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.shape({
    uid: PropTypes.number,
    file: PropTypes.object,
    completed: PropTypes.number,
    uprate: PropTypes.number,
  }),
};
