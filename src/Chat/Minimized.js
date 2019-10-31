import React from 'react';
import Icon from '@mdi/react';
import { mdiForum } from '@mdi/js';
import { Badge } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

import { FloatingButton } from '../Buttons/FloatingButton';

const Minimized = ({ maximize, notifyNumber }) => {
  const theme = useTheme();

  return (
    <Badge color="error" badgeContent={notifyNumber}>
      <FloatingButton onClick={maximize} variant="primary" size="large">
        <Icon
          path={mdiForum}
          size={1.25}
          color={theme.palette.primary.contrastText}
        />
      </FloatingButton>
    </Badge>
  );
};

export default Minimized;
