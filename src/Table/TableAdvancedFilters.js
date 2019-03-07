import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles(theme => ({
	advancedFilterContent: {
		padding: theme.spacing.unit,
	},
	popover: {
		maxWidth: '700px',
		maxHeight: '400px',
	}
}));

const TableAdvancedFilters = ({ tooltipAdvancedFilter, advancedFiltersComponent }) => {
	if (!advancedFiltersComponent) return null;

	const classes = styles();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	return (
		<React.Fragment>
			<Tooltip title={tooltipAdvancedFilter || 'Advanced Filters'}>
				<IconButton onClick={event => setAnchorEl(event.currentTarget)}>
					<FilterIcon />
				</IconButton>
			</Tooltip>
			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={() => setAnchorEl(null)}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'center',
					horizontal: 'right',
				}}
			>
				<div className={classes.advancedFilterContent}>
					{advancedFiltersComponent}
				</div>
			</Popover>
		</React.Fragment>
	);
};

TableAdvancedFilters.propTypes = {
	tooltipAdvancedFilter: PropTypes.string,
	advancedFiltersComponent: PropTypes.object,
}

export default TableAdvancedFilters;