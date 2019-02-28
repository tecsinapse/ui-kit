import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from '@material-ui/core/Popover';

const Action = ({ action, row, setAnchorEl }) => {
  const { icon, tooltip, onClick } = action;
  const onClickButton = event => {
    if (onClick) {
      onClick(row, event);
      setAnchorEl(null);
      event.stopPropagation();
    }
  };
  const button = <IconButton onClick={onClickButton}>{icon}</IconButton>;

  if (tooltip) {
    return <Tooltip title={tooltip}>{button}</Tooltip>;
  }
  return button;
};

const TableActions = ({ actions, row }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Commented rule of no-array-index-key because in the array of actions this is not necessary
  // eslint-disable-next-line
  const actionButtons = actions.map((action, index) => (
    <Action
      key={`action-${index}`}
      action={action}
      row={row}
      setAnchorEl={setAnchorEl}
    />
  ));
  const open = Boolean(anchorEl);

  if (actions.length < 4) {
    return actionButtons;
  }

  return (
    <React.Fragment>
      <IconButton
        onClick={event => setAnchorEl(event.currentTarget)}
        aria-owns={open ? 'simple-popper' : undefined}
        aria-haspopup="true"
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        {actionButtons}
      </Popover>
    </React.Fragment>
  );
};

TableActions.defaultProps = {
  row: null,
};

TableActions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      tooltip: PropTypes.string,
      icon: PropTypes.object,
      onClick: PropTypes.func,
    })
  ).isRequired,
  row: PropTypes.object,
};

export default TableActions;
