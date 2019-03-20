import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { isImage } from './helper';

const useStyle = makeStyles({
  primary: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  drag: {
    borderStyle: 'dashed',
    width: '90%',
    height: '80%',
    position: 'relative',
    border: '2px dashed grey',
    borderRadius: '6px',
    backgroundColor: '#80808021',
  },
  preview: {
    border: '2px dashed red',
    width: '100%',
    height: '100%',
  },
  dropzoneText: {
    position: 'absolute',
    top: '40%',
    left: '8%',
    textAlign: 'center',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexBasis: '40%',
  },
  img: {
    height: 100,
    width: 'initial',
    maxWidth: '100%',
    marginTop: 5,
    marginRight: 10,
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    boxSizing: 'border-box',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px',
    borderRadius: 2,
    zIndex: 5,
    opacity: 1,
  },
});

export function UpFile({
  key,
  uid,
  filename,
  completed,
  filesize,
  uprate,
  divider,
  setShowAlert,
  setSelectedUID,
  data,
}) {
  const classes = useStyle();

  const img = isImage(filename) ? (
    <img className={classes.img} alt="presentation" src={data} />
  ) : (
    <AttachFileIcon />
  );
  return (
    <React.Fragment>
      <ListItem key={key}>
        <ListItemIcon>{img}</ListItemIcon>
        <ListItemText
          primary={
            <div className={classes.primary}>
              <div className={classes.info}>
                <Typography variant="subtitle2">{filename}</Typography>
                <Typography variant="body2">{filesize}</Typography>
              </div>
              <IconButton
                onClick={() => {
                  setShowAlert(true);
                  setSelectedUID(uid);
                }}
              >
                <Delete />
              </IconButton>
            </div>
          }
          secondary={
            <React.Fragment>
              <LinearProgress variant="determinate" value={completed} />
              <div className={classes.info}>
                {completed < 100 ? (
                  <Typography variant="body2">{uprate}</Typography>
                ) : (
                  <Typography variant="body2">Completed</Typography>
                )}
                {completed < 100 ? (
                  <Typography variant="body2">
                    {' '}
                    {`${Math.round(completed)}% done`}
                  </Typography>
                ) : null}
              </div>
            </React.Fragment>
          }
        />
      </ListItem>
      {divider ? <Divider variant="middle" /> : null}
    </React.Fragment>
  );
}
