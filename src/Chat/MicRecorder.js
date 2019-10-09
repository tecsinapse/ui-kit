import React, { useState } from 'react';
import { ReactMic } from '@cleandersonlobo/react-mic';
import Icon from '@mdi/react';
import {
  mdiMicrophone,
  mdiCloseCircle,
  mdiCheckCircle,
  mdiCheckboxBlankCircle,
} from '@mdi/js';
import PropTypes from 'prop-types';
import { IconButton } from '@livechat/ui-kit';
import Timer from 'react-compound-timer';
import { Typography } from '@material-ui/core';

import { defaultGreyLight2 } from '../colors';

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
    <div style={{ display: 'flex', flexGrow, justifyContent: 'center' }}>
      <div style={{ display: 'flex' }}>
        <IconButton
          fill
          key="cancelRecord"
          onClick={() => stopRecording(false)}
        >
          <Icon path={mdiCloseCircle} size={iconSize} color="red" />
        </IconButton>
      </div>
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
          <Typography variant="caption">GRAVANDO</Typography>
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
            size={iconSize * 0.5}
            color="red"
          />
          <Typography>
            <Timer formatValue={value => `${value < 10 ? `0${value}` : value}`}>
              <Timer.Minutes />:<Timer.Seconds />
            </Timer>
          </Typography>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <IconButton
          fill
          key="confirmRecord"
          onClick={() => stopRecording(true)}
        >
          <Icon path={mdiCheckCircle} size={iconSize} color="green" />
        </IconButton>
      </div>
    </div>
  );
};

MicRecorder.defaultProps = {
  onStartRecording: undefined,
  onStopRecording: undefined,
  iconSize: 1,
  flexGrow: 1,
  waveWidth: 200,
  waveHeight: 30,
};

MicRecorder.propTypes = {
  onStartRecording: PropTypes.func,
  onStopRecording: PropTypes.func,
  iconSize: PropTypes.number,
  flexGrow: PropTypes.number,
  waveWidth: PropTypes.number,
  waveHeight: PropTypes.number,
};

export default MicRecorder;
