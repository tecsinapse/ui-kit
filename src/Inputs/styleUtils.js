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

const StyledFlexDiv = styled('div')(({ theme, endAdornmentMargin }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: endAdornmentMargin ? theme.spacing.unit : 0,
}));
const TypographyStyled = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing.unit / 4,
}));
export function GetEndAdornment({
  warning,
  error,
  success,
  endAdornment,
  endAdornmentMargin,
}) {
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
      <StyledFlexDiv endAdornmentMargin={endAdornmentMargin}>
        {stateIcon} <TypographyStyled>|</TypographyStyled> {endAdornment}
      </StyledFlexDiv>
    );
  }
  return (
    <StyledFlexDiv endAdornmentMargin={endAdornmentMargin}>
      {stateIcon && stateIcon}
      {endAdornment && endAdornment}
    </StyledFlexDiv>
  );
}
