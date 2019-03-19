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
});

export function UpFile({
  key,
  filename,
  completed,
  filesize,
  uprate,
  divider,
}) {
  const classes = useStyle();

  return (
    <React.Fragment>
      <ListItem key={key}>
        <ListItemIcon>
          <AttachFileIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <div className={classes.primary}>
              <div className={classes.info}>
                <Typography variant="subtitle2">{filename}</Typography>
                <Typography variant="body2">{filesize}</Typography>
              </div>
              <IconButton onClick={/* DUMMY */ () => {}}>
                <Delete />
              </IconButton>
            </div>
          }
          secondary={
            <React.Fragment>
              <LinearProgress variant="determinate" value={completed} />
              <div className={classes.info}>
                <Typography variant="body2">{uprate}</Typography>
                <Typography variant="body2">
                  {completed <= 100
                    ? `${Math.round(completed)}% done`
                    : '100% done'}
                </Typography>
              </div>
            </React.Fragment>
          }
        />
      </ListItem>
      {divider ? <Divider variant="middle" /> : null}
    </React.Fragment>
  );
}
