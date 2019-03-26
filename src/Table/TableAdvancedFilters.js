import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/styles';
import AdvancedFilters from './AdvancedFilters';

const styles = makeStyles(theme => ({
  advancedFiltersContent: {
    // padding: theme.spacing.unit,
  },
  popover: {
    maxWidth: '700px',
    maxHeight: '400px',
  },
}));

const onApplyFilter = (setAnchorEl, setFilters) => advancedFilters => {
  setFilters(prevFilters => ({ ...prevFilters, advancedFilters }));
  setAnchorEl(null);
};

const TableAdvancedFilters = ({
  tooltipAdvancedFilter,
  advancedFiltersComponent,
  advancedFiltersOptions,
  setFilters,
  filters,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  if (!advancedFiltersComponent && !advancedFiltersOptions) return null;

  const classes = styles();
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
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={classes.advancedFiltersContent}>
          {advancedFiltersComponent || (
            <AdvancedFilters
              advancedFiltersOptions={advancedFiltersOptions}
              tooltipAdvancedFilter={tooltipAdvancedFilter}
              onApplyFilter={onApplyFilter(setAnchorEl, setFilters)}
              setFilters={setFilters}
              filters={filters}
            />
          )}
        </div>
      </Popover>
    </React.Fragment>
  );
};

TableAdvancedFilters.defaultProps = {
  tooltipAdvancedFilter: null,
  advancedFiltersComponent: null,
  advancedFilters: null,
};

TableAdvancedFilters.propTypes = {
  tooltipAdvancedFilter: PropTypes.string,
  advancedFiltersComponent: PropTypes.object,
  advancedFilters: PropTypes.shape({
    filters: PropTypes.arrayOf(
      PropTypes.shape({
        group: PropTypes.string,
        type: PropTypes.oneOf([
          'input',
          'select',
          'multi-select',
          'date',
          'time',
          'date-time',
        ]),
        name: PropTypes.string,
        label: PropTypes.string,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.string,
            disabled: PropTypes.bool,
          })
        ),
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.arrayOf(PropTypes.string),
        ]),
      })
    ),
  }),
};

export default TableAdvancedFilters;
