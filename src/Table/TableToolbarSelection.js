import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const selectionStyles = makeStyles(theme => ({
	toolbar: {
		color: theme.palette.secondary.main,
		backgroundColor: lighten(theme.palette.secondary.light, 0.8),
		paddingRight: theme.spacing.unit,
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
		margin: theme.spacing.unit,
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

const TableToolbarSelection = ({ options, selectedRows }) => {
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
					{actions.map((action, index) => {
						// Commented rule of no-array-index-key because in the array of actions this is not necessary
						// eslint-disable-next-line
						return <Action
							key={`tb-action-${index}`}
							action={action}
							selectedRows={selectedRows}
						/>
					})}
				</div>
			)}
		</Toolbar>
	);
};

TableToolbarSelection.defaultProps = {
	selectedRows: [],
	selection: false,
	options: null,
};

TableToolbarSelection.propTypes = {
	selectedRows: PropTypes.arrayOf(PropTypes.object),
	options: PropTypes.shape({
		title: PropTypes.string,
		selectedLabel: PropTypes.func,
		actions: PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string,
				tooltip: PropTypes.string,
				iconLeft: PropTypes.object,
				iconRight: PropTypes.object,
				onClick: PropTypes.func.isRequired,
			})
		),
	}),
};

export default TableToolbarSelection;