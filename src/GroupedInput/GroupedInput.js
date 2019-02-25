import React from 'react';
import { styled } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Input } from '../Inputs/Input';

const FlexDiv = styled('div')({
  display: 'flex',
});
export const GroupedInput = ({ onDelete, ...props }) => (
  <FlexDiv>
    <Input {...props} />
    <IconButton color="secondary" onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  </FlexDiv>
);
