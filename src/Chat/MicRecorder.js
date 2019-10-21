import React, { useState } from 'react';
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
import { Typography } from '@material-ui/core';

export const MicRecorder = ({
  onStopRecording,
  iconSize,
  flexGrow,
  waveWidth,
  waveHeight,
}) => {
  const [recording, setRecording] = useState(true);

  let accepted = false;

  const stopRecording = acceptedClicked => {
    accepted = acceptedClicked;
    setRecording(false);
  };

  const onStop = recordedBlob => {
    onStopRecording(recordedBlob, accepted);
  };

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
        }}
      >
        <div>
          <Typography variant="caption" style={{ color: '#787879' }}>
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
          <Icon path={mdiCheckboxBlankCircle} size={0.5} color="red" />
          <Typography variant="subtitle" style={{ color: '#787879' }}>
            <Timer formatValue={value => `${value < 10 ? `0${value}` : value}`}>
              <Timer.Minutes />:<Timer.Seconds />
            </Timer>
          </Typography>
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
