import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined';
import Clear from '@material-ui/icons/Clear';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/styles';
// import AttachFileIcon from '@material-ui/icons/AttachFile';
import { isImage } from './helper';

const useStyle = makeStyles({
  item: {
    backgroundColor: '#f7f7f7',
    borderRadius: '5px 5px 0px 0px ',
    minHeight: '55px',
    marginTop: '3%',
    paddingBottom: '5px',
    paddingTop: '5px',
    // border: '2px dashed blue',
  },
  itemError: {
    backgroundColor: '#ffb1b1',
    borderRadius: '5px 5px 0px 0px ',
    minHeight: '55px',
    marginTop: '3%',
    paddingBottom: '5px',
    paddingTop: '5px',
  },
  primary: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // border: '2px dashed blue',
    width: '100%',
    maxHeight: '10%',
  },
  info: {
    maxWidth: '100%',
    // border: '2px dashed red',
    display: 'flex',
    alignItems: 'baseline',
    flex: '2 1 auto',
    flexWrap: 'wrap',
  },
  img: {
    maxWidth: '40px',
    maxHeight: '40px',
    // border: '2px dashed green',
    display: 'block',
  },
  thumbnail: {
    // border: '2px dashed green',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    marginRight: '0px',
  },
  loading: {
    borderRadius: '0px 0px 5px 5px ',
  },
  barCompleted: {
    backgroundColor: '#4caf50',
  },
  barError: {
    backgroundColor: '#e6433f',
  },
  barError2: {
    backgroundColor: '#ffb1b1',
  },
  errorDiv: {
    display: 'flex',
    alignItems: 'center',
    // border: '2px dashed blue',
    width: '100%',
  },
  name: {
    // border: '2px dashed green',
    maxWidth: '60%',
  },
});

export function UpFile({
  uid,
  filename,
  completed,
  filesize,
  setShowAlert,
  setSelectedUID,
  data,
  error,
  setSnackBar,
  messages: { fileUploadedSucessfullyMessage, fileErroedMessage },
}) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isError, setIsError] = useState(false);

  const classes = useStyle();

  if (completed >= 100 && !isCompleted) {
    setSnackBar({
      show: true,
      variant: 'success',
      msg: fileUploadedSucessfullyMessage(filename),
    });
    setIsCompleted(true);
  }

  if (error && !isError) {
    setSnackBar({
      show: true,
      variant: 'error',
      msg: fileErroedMessage(filename, error),
    });
    setIsError(true);
  }

  const img =
    isImage(filename) && data ? (
      <img alt="presentation" src={data} className={classes.img} />
    ) : null;

  return (
    <React.Fragment>
      <ListItem key={uid} className={error ? classes.itemError : classes.item}>
        {img ? (
          <ListItemIcon className={classes.thumbnail}>{img}</ListItemIcon>
        ) : null}
        <ListItemText
          primary={
            <div className={classes.primary}>
              <div className={classes.info}>
                <Typography variant="subtitle2" noWrap className={classes.name}>
                  {filename}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                  style={{ marginLeft: '2%' }}
                >
                  ({filesize})
                </Typography>
                {error ? (
                  <div className={classes.errorDiv}>
                    <ErrorOutlineOutlined fontSize="small" />
                    <Typography
                      variant="caption"
                      style={{ marginLeft: '2%' }}
                      noWrap
                    >
                      {error}
                    </Typography>
                  </div>
                ) : null}
              </div>
            </div>
          }
        />
        <IconButton
          onClick={() => {
            setShowAlert(true);
            setSelectedUID(uid);
          }}
          style={{ padding: '0px' }}
        >
          <Clear fontSize="small" />
        </IconButton>
      </ListItem>
      {
        <LinearProgress
          variant="determinate"
          value={completed}
          className={classes.loading}
          classes={
            error
              ? {
                  bar1Determinate: classes.barError,
                  determinate: classes.barError2,
                }
              : {
                  bar1Determinate:
                    completed >= 100 ? classes.barCompleted : null,
                }
          }
        />
      }
    </React.Fragment>
  );
}
