import { mdiAlertCircle, mdiCheckCircle, mdiCloseCircle } from '@mdi/js';
import React from 'react';
import Icon from '@mdi/react';
import { styled } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
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

const StyledFlexDiv = styled('div')({
  display: 'flex',
  alignItems: 'center',
});
const TypographyStyled = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing.unit / 4,
}));
export function GetEndAdornment({ warning, error, success, endAdornment }) {
  let stateIcon;
  if (error) {
    stateIcon = <Icon path={mdiCloseCircle} color={defaultRed} size={1} />;
  }
  if (success) {
    stateIcon = <Icon path={mdiCheckCircle} color={defaultGreen} size={1} />;
  }
  if (warning) {
    stateIcon = <Icon path={mdiAlertCircle} color={defaultOrange} size={1} />;
  }
  if (stateIcon && endAdornment) {
    return (
      <StyledFlexDiv>
        {stateIcon} <TypographyStyled>|</TypographyStyled> {endAdornment}
      </StyledFlexDiv>
    );
  }
  return (
    <StyledFlexDiv>
      {stateIcon && stateIcon}
      {endAdornment && endAdornment}
    </StyledFlexDiv>
  );
}
