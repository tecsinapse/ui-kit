import React from 'react';
import { styled } from '@material-ui/styles';
import { CircularProgress } from '@material-ui/core';

const StyledDiv = styled('div')({
  textAlign: 'center',
  padding: '15px 0',
});
const CircularProgressStyled = styled(CircularProgress)({});
export const Loading = () => (
  <StyledDiv>
    <CircularProgressStyled size={60} />
  </StyledDiv>
);
