import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { toolbarOptionsTypes } from '../../utils/propTypes';

const selectionStyles = makeStyles(theme => ({
  toolbar: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.8),
    paddingRight: theme.spacing(1),
  },
  title: {
    width: '100%',
    maxWidth: '50%',
  },
  colorTitle: {
    color: theme.palette.secondary.main,
  },
  actions: {
    width: '100%',
    textAlign: 'right',
    maxWidth: '50%',
  },
}));

const actionStyles = makeStyles(theme => ({
  button: {
    color: theme.palette.text.secondary,
  },
}));

const Action = ({ action, selectedRows }) => {
  const { label, tooltip, iconLeft, iconRight, onClick } = action;

  const classes = actionStyles();

  const button = (
    <Button onClick={() => onClick(selectedRows)} className={classes.button}>
      {iconLeft}
      {label}
      {iconRight}
    </Button>
  );

  if (tooltip) {
    return <Tooltip title={tooltip}>{button}</Tooltip>;
  }
  return button;
};

const SelectionActions = ({ options, selectedRows }) => {
  const { actions, selectedLabel } = options || {};
  const classes = selectionStyles();

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.title}>
        <Typography
          variant="subtitle1"
          id="tableTitle"
          className={classes.colorTitle}
        >
          {selectedLabel
            ? selectedLabel(selectedRows.length)
            : `${selectedRows.length} Selected`}
        </Typography>
      </div>
      {actions && (
        <div className={classes.actions}>
          {actions.map(action => (
            <Action
              key={`tb-action-${action.key}`}
              action={action}
              selectedRows={selectedRows}
            />
          ))}
        </div>
      )}
    </Toolbar>
  );
};

SelectionActions.defaultProps = {
  selectedRows: [],
  options: null,
};

SelectionActions.propTypes = {
  selectedRows: PropTypes.arrayOf(PropTypes.object),
  options: toolbarOptionsTypes,
};

export default SelectionActions;
