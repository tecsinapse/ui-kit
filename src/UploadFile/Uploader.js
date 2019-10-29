import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Snackbar } from '../Snackbar/Snackbar';
import { convertBytes } from './helper';
import { Button } from '../Buttons/Button';

const useStyle = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dropzone: {
    width: '100%',
    height: '100%',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    height: '80%',
    width: '80%',
  },
  textDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexBasis: '40%',
  },
  button: {
    alignSelf: 'center',
    width: '70%',
  },
  divider: {
    width: '25%',
    alignSelf: 'center',
    marginBottom: '4%',
    marginTop: '1%',
  },
  buttonDiv: {
    alignSelf: 'center',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  buttonIcon: {
    marginRight: '5%',
  },
  text: {
    marginBottom: '1%',
  },
  iconColor: {
    color: '#61616152',
  },
  hidden: {
    visibility: 'hidden',
  },
});

export const Uploader = forwardRef(
  (
    {
      value,
      acceptedFormat,
      filesLimit,
      maxFileSize,
      onAccept,
      onReject,
      silent,
      messages: {
        title,
        buttonLabel,
        subtitle,
        maximumFileLimitMessage,
        maximumFileNumberMessage,
        filenameFailedMessage,
        filetypeNotSupportedMessage,
        sizeLimitErrorMessage,
        undefinedErrorMessage,
      },
    },
    ref
  ) => {
    const [snackbar, setSnackBar] = useState({
      show: false,
      variant: 'error',
      msg: '',
    });
    const classes = useStyle();

    const { getRootProps, getInputProps, open } = useDropzone({
      noClick: true,
      noKeyboard: true,
      accept: acceptedFormat ? acceptedFormat.join(',') : undefined,
      maxSize: maxFileSize,
      onDrop: acceptedFiles => {
        // The limit only counts uploading file (no error and no completed)
        if (
          acceptedFiles.length +
            Object.keys(value).filter(
              i => !value[i].error && !(value[i].completed >= 100)
            ).length <=
          filesLimit
        ) {
          if (onAccept) {
            onAccept(acceptedFiles);
          }
        } else {
          setSnackBar({
            show: true,
            variant: 'error',
            msg: maximumFileLimitMessage(filesLimit),
          });
          if (onReject) {
            onReject(
              acceptedFiles.map(file => ({
                file,
                error: maximumFileNumberMessage,
              }))
            );
          }
        }
      },
      onDropRejected: rejectedFiles => {
        let message = '';
        const errorFile = [];
        rejectedFiles.forEach(rejectedFile => {
          let messageFile = '';
          message += filenameFailedMessage(rejectedFile.name);
          if (!acceptedFormat.includes(rejectedFile.type)) {
            messageFile += filetypeNotSupportedMessage;
          }
          if (rejectedFile.size > maxFileSize) {
            messageFile += sizeLimitErrorMessage(convertBytes(maxFileSize));
          }
          if (messageFile === '') {
            messageFile = undefinedErrorMessage;
          }
          errorFile.push({ file: rejectedFile, error: messageFile });
        });
        setSnackBar({
          show: true,
          variant: 'error',
          msg: message,
        });
        if (onReject && errorFile.length > 0) {
          onReject(errorFile);
        }
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

    useImperativeHandle(ref, () => ({
      open,
    }));

    return (
      <React.Fragment>
        {silent ? (
          <div ref={ref}>
            <input {...getInputProps()} className={classes.hidden} />
          </div>
        ) : (
          <div {...rootProps} className={classes.root}>
            <input {...getInputProps()} />
            <div className={classes.dropzone}>
              <div className={classes.textDiv} ref={ref}>
                <CloudUploadIcon
                  fontSize="large"
                  color="primary"
                  className={classes.icon}
                  classes={{ colorPrimary: classes.iconColor }}
                />
                <Typography variant="h5" color="textSecondary">
                  {title}
                </Typography>
              </div>

              <div className={classes.divider}>
                <Divider variant="middle" />
              </div>

              <div className={classes.buttonDiv}>
                <Typography
                  variant="body2"
                  className={classes.text}
                  color="textSecondary"
                >
                  {subtitle}
                </Typography>
                <Button
                  variant="secondary"
                  onClick={open}
                  className={classes.button}
                >
                  <CloudUploadIcon className={classes.buttonIcon} />
                  {buttonLabel}
                </Button>
              </div>
            </div>
          </div>
        )}
        <Snackbar
          show={snackbar.show}
          variant={snackbar.variant}
          onClose={() =>
            setSnackBar(prevSnack => ({
              show: false,
              variant: prevSnack.variant,
              msg: prevSnack.msg,
            }))
          }
        >
          {snackbar.msg}
        </Snackbar>
      </React.Fragment>
    );
  }
);

Uploader.defaultProps = {
  value: {},
  acceptedFormat: undefined,
  filesLimit: 3,
  maxFileSize: 3000000,
  onAccept: null,
  onReject: null,
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
  },

  silent: false,
};

Uploader.propTypes = {
  acceptedFormat: PropTypes.array,
  filesLimit: PropTypes.number,
  maxFileSize: PropTypes.number,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  silent: PropTypes.bool,
  value: PropTypes.shape({
    uid: PropTypes.number,
    file: PropTypes.object,
    completed: PropTypes.number,
    uprate: PropTypes.number,
    error: PropTypes.string,
  }),
  messages: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    buttonLabel: PropTypes.string,
    filetypeNotSupportedMessage: PropTypes.string,
    undefinedErrorMessage: PropTypes.string,
    maximumFileLimitMessage: PropTypes.func,
    filenameFailedMessage: PropTypes.func,
    sizeLimitErrorMessage: PropTypes.func,
  }),
};
