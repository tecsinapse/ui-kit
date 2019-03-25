import React, { useState } from 'react';
import List from '@material-ui/core/List';
import { Typography } from '@material-ui/core';
import FeedbackOutlined from '@material-ui/icons/FeedbackOutlined';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { convertBytes } from './helper';
import { ConfirmationAlert } from '../Alerts/ConfirmationAlert';
import { UpFile } from './UpFile';

const useStyle = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  icon: {
    width: '50%',
    height: '50%',
    flexBasis: '20%',
    alignItems: 'center',
  },
  text: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    flexBasis: '55%',
    textAlign: 'center',
  },
});

export function PreviewList({ value, onDelete }) {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedUID, setSelectedUID] = useState('');

  const classes = useStyle();

  return (
    <React.Fragment>
      <ConfirmationAlert
        show={showAlert}
        proceed={() => {
          setShowAlert(false);
          onDelete(selectedUID);
        }}
        cancel={() => {
          setShowAlert(false);
          setSelectedUID('');
        }}
        dismiss={() => {
          setShowAlert(false);
          setSelectedUID('');
        }}
      />

      {Object.keys(value).length <= 0 ? (
        <div className={classes.root}>
          <FeedbackOutlined fontSize="large" className={classes.icon} />
          <Typography variant="h5" className={classes.text}>
            Upload Files Appear Here
          </Typography>
        </div>
      ) : (
        <List>
          {Object.keys(value).map((uid, i) => (
            <UpFile
              key={uid}
              uid={uid}
              filename={value[uid].file.name}
              completed={value[uid].completed}
              filesize={convertBytes(value[uid].file.size)}
              uprate={`${convertBytes(value[uid].uprate)}/sec`}
              divider={Object.keys(value).length !== i + 1}
              setShowAlert={setShowAlert}
              setSelectedUID={setSelectedUID}
              data={value[uid].data}
            />
          ))}
        </List>
      )}
    </React.Fragment>
  );
}

PreviewList.defaultProps = {
  value: {},
};

PreviewList.propTypes = {
  value: PropTypes.shape({
    uid: PropTypes.number,
    file: PropTypes.object,
    completed: PropTypes.number,
    uprate: PropTypes.number,
  }),
};
