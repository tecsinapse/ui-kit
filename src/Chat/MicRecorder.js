import React, { useState, useEffect, useRef } from 'react';
import { ReactMic } from '@cleandersonlobo/react-mic';
import Icon from '@mdi/react';
import {
  mdiCloseCircle,
  mdiCheckCircle,
  mdiCheckboxBlankCircle,
} from '@mdi/js';
import PropTypes from 'prop-types';
import { IconButton } from '@livechat/ui-kit';
import Timer from 'react-compound-timer';
import { Typography, makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
  reactMic: {
    opacity: '0.30',
  },
});

export const MicRecorder = ({
  onStopRecording,
  iconSize,
  flexGrow,
  waveWidth,
  waveHeight,
}) => {
  const [recording, setRecording] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const accepted = useRef(false);

  const classes = useStyle();

  const stopRecording = acceptedClicked => {
    accepted.current = acceptedClicked;
    setRecording(false);
  };

  const onStop = recordedBlob => {
    onStopRecording(recordedBlob, accepted.current);
  };

  useEffect(() => {
    const animation = setInterval(
      () => setOpacity(oldOpacity => (oldOpacity > 0 ? 0 : 1)),
      1000
    );
    return () => {
      clearInterval(animation);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexGrow,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <IconButton fill key="cancelRecord" onClick={() => stopRecording(false)}>
        <Icon path={mdiCloseCircle} size={iconSize} color="red" />
      </IconButton>
      <div style={{ display: 'flex' }}>
        <ReactMic
          className={classes.reactMic}
          height={waveHeight}
          width={waveWidth}
          record={recording}
          onStop={onStop}
          strokeColor="#000000"
          backgroundColor="#fff"
          mimeType="audio/mp3"
          visualSetting="sinewave" // frequencyBars
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          <Typography
            variant="subtitle2"
            style={{ color: '#787879', fontSize: '12px', lineHeight: 1 }}
          >
            GRAVANDO
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Icon
            path={mdiCheckboxBlankCircle}
            size={0.5}
            color="red"
            style={{ opacity, padding: '2px 6px 0px 0px' }}
          />
          <Timer formatValue={value => `${value < 10 ? `0${value}` : value}`}>
            <Typography
              variant="h6"
              style={{
                color: '#787879',
                fontSize: '18px',
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              <Timer.Minutes />:<Timer.Seconds />
            </Typography>
          </Timer>
        </div>
      </div>
      <IconButton fill key="confirmRecord" onClick={() => stopRecording(true)}>
        <Icon path={mdiCheckCircle} size={iconSize} color="green" />
      </IconButton>
    </div>
  );
};

MicRecorder.defaultProps = {
  onStopRecording: undefined,
  iconSize: 1.5,
  flexGrow: 1,
  waveWidth: 200,
  waveHeight: 30,
};

MicRecorder.propTypes = {
  onStopRecording: PropTypes.func,
  iconSize: PropTypes.number,
  flexGrow: PropTypes.number,
  waveWidth: PropTypes.number,
  waveHeight: PropTypes.number,
};

export default MicRecorder;
