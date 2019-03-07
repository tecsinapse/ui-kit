import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import TableToolbarSelection from './TableToolbarSelection';
import TableAdvancedFilters from './TableAdvancedFilters';

const tableToolbarStyles = makeStyles(theme => ({
	toolbar: {
		paddingRight: theme.spacing.unit,
	},
	title: {
		width: '100%',
		maxWidth: '80%',
	},
	filter: {
		width: '100%',
		textAlign: 'right',
		maxWidth: '20%',
	},
}));

const SimpleToolbar = ({ options }) => {
	const { title, tooltipAdvancedFilter, advancedFiltersComponent } = options || {};
	const classes = tableToolbarStyles();

	return (
		<Toolbar className={classes.toolbar}>
			<div className={classes.title}>
				<Typography variant="h6" id="tableTitle">
					{title}
				</Typography>
			</div>
			<div className={classes.filter}>
				<TableAdvancedFilters tooltipAdvancedFilter={tooltipAdvancedFilter} advancedFiltersComponent={advancedFiltersComponent} />
			</div>
		</Toolbar>
	);
};

const TableToolbar = ({ options, selectedRows, selection }) => {
	if (!options && !selection) return null;

	if (selectedRows.length === 0) {
		return <SimpleToolbar options={options} />;
	}

	return <TableToolbarSelection options={options} selectedRows={selectedRows} />;
};

TableToolbar.defaultProps = {
	selectedRows: [],
	selection: false,
	options: null,
};

TableToolbar.propTypes = {
	selectedRows: PropTypes.arrayOf(PropTypes.object),
	selection: PropTypes.bool,
	options: PropTypes.shape({
		title: PropTypes.string,
		selectedLabel: PropTypes.func,
		tooltipAdvancedFilter: PropTypes.string,
		advancedFiltersComponent: PropTypes.obj,
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

export default TableToolbar;
