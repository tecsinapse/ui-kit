import { mdiAlertCircle, mdiCheckCircle, mdiCloseCircle } from '@mdi/js';
import React from 'react';
import Icon from '@mdi/react';
import { defaultGreen, defaultOrange, defaultRed } from '../colors';

export const outlinedInputClass = ({ success, error, warning }) => {
  if (error) {
    return 'cssOutlinedInputRed';
  }
  if (success) {
    return 'cssOutlinedInputSuccess';
  }
  if (warning) {
    return 'cssOutlinedInputWarning';
  }
  return 'cssOutlinedInput';
};

export const labelClass = ({ success, error, warning }) => {
  if (error) {
    return 'cssLabelRed';
  }
  if (success) {
    return 'cssLabelSuccess';
  }
  if (warning) {
    return 'cssLabelWarning';
  }
  return 'cssLabel';
};

export function getEndAdornmentIcon({ warning, error, success }) {
  if (error) {
    return <Icon path={mdiCloseCircle} color={defaultRed} size={1} />;
  }
  if (success) {
    return <Icon path={mdiCheckCircle} color={defaultGreen} size={1} />;
  }
  if (warning) {
    return <Icon path={mdiAlertCircle} color={defaultOrange} size={1} />;
  }
  return undefined;
}
