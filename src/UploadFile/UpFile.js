import React from 'react';
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
    backgroundColor: '#8080801c',
    borderRadius: '5px 5px 0px 0px ',
    marginTop: '5%',
  },
  itemError: {
    backgroundColor: '#ff00004d',
    borderRadius: '5px 5px 0px 0px ',
    marginTop: '5%',
  },
  primary: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // border: '2px dashed blue',
    width: '110%',
    maxHeight: '10%',
  },
  info: {
    // border: '2px dashed red',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'baseline',
    flex: '2 1 auto',
    flexWrap: 'wrap',
  },
  img: {
    maxWidth: '45px',
    maxHeight: '45px',
    // width: '45px',
    // height: '45px',
    // border: '2px dashed green',
    position: 'relative',
  },
  loading: {
    borderRadius: '0px 0px 5px 5px ',
  },
  barCompleted: {
    backgroundColor: '#22b5228c',
  },
  barError: {
    backgroundColor: '#ff00004d',
  },
  errorDiv: {
    display: 'flex',
    alignItems: 'center',
    // border: '2px dashed blue',
    width: '100%',
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
}) {
  const classes = useStyle();

  const img =
    isImage(filename) && data ? (
      <img alt="presentation" src={data} className={classes.img} />
    ) : null;
  return (
    <React.Fragment>
      <ListItem key={uid} className={error ? classes.itemError : classes.item}>
        {img ? <ListItemIcon>{img}</ListItemIcon> : null}
        <ListItemText
          primary={
            <div className={classes.primary}>
              <div className={classes.info}>
                <Typography variant="subtitle2" noWrap>
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
                    <ErrorOutlineOutlined />
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
              <IconButton
                onClick={() => {
                  setShowAlert(true);
                  setSelectedUID(uid);
                }}
              >
                <Clear />
              </IconButton>
            </div>
          }
        />
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
                  determinate: classes.barError,
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
