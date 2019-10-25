import React from 'react';
import { styled } from '@material-ui/styles';
import { CircularProgress } from '@material-ui/core';
import { defaultGreyLight4 } from '../colors';

const StyledDiv = styled('div')({
  textAlign: 'center',
  padding: '15px 0',
  backgroundColor: defaultGreyLight4, // same color as MessageList
});
const CircularProgressStyled = styled(CircularProgress)({});
export const Loading = () => (
  <StyledDiv>
    <CircularProgressStyled size={60} />
  </StyledDiv>
);
