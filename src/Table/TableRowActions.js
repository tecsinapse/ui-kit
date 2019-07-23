import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from '@material-ui/core/Popover';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const Action = ({ action, row, vertical, setAnchorEl }) => {
  const {
    icon,
    tooltip,
    onClick,
    label,
    bottomDivider = false,
    labelColor,
  } = action;
  const onClickButton = event => {
    if (onClick) {
      onClick(row, event);
      setAnchorEl(null);
    }
    event.stopPropagation();
  };
  const button = vertical ? (
    <Fragment>
      <ListItem button onClick={onClickButton}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText
          disableTypography
          primary={
            <Typography
              type="body2"
              style={labelColor ? { color: labelColor } : undefined}
            >
              {label}
            </Typography>
          }
        />
      </ListItem>
      {bottomDivider && <Divider />}
    </Fragment>
  ) : (
    <IconButton onClick={onClickButton}>
      {icon} {label}
    </IconButton>
  );

  if (tooltip) {
    return <Tooltip title={tooltip}>{button}</Tooltip>;
  }
  return button;
};

function getActionButtons(actions, vertical = false, row, setAnchorEl) {
  return actions
    .filter(action => !action.visible || action.visible(row))
    .map((action, index) => (
      <Action
        vertical={vertical}
        // Commented rule of no-array-index-key because in the array of actions this is not necessary
        // eslint-disable-next-line
        key={`action-${index}`}
        action={action}
        row={row}
        setAnchorEl={setAnchorEl}
      />
    ));
}

const TableRowActions = ({
  actions,
  row,
  verticalActions = false,
  forceCollapseActions,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const actionButtons = getActionButtons(
    actions,
    verticalActions,
    row,
    setAnchorEl
  );
  const open = Boolean(anchorEl);

  const returnEmpty = actionButtons.length === 0;
  if (
    returnEmpty ||
    (actions.length < 4 && !forceCollapseActions && !verticalActions)
  ) {
    return actionButtons;
  }

  return (
    <React.Fragment>
      <IconButton
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          setAnchorEl(event.currentTarget);
        }}
        aria-owns={open ? 'simple-popper' : undefined}
        aria-haspopup="true"
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={event => {
          event.preventDefault();
          event.stopPropagation();
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        {verticalActions ? (
          <List disablePadding>{actionButtons}</List>
        ) : (
          actionButtons
        )}
      </Popover>
    </React.Fragment>
  );
};

TableRowActions.defaultProps = {
  row: null,
  forceCollapseActions: false,
};

TableRowActions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      tooltip: PropTypes.string,
      icon: PropTypes.object,
      onClick: PropTypes.func,
      visible: PropTypes.func,
    })
  ).isRequired,
  row: PropTypes.object,
  forceCollapseActions: PropTypes.bool,
};

export default TableRowActions;
