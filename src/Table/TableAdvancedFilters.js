import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FilterIcon from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles(theme => ({
  advancedFiltersContent: {
    // padding: theme.spacing.unit,
  },
  popover: {
    maxWidth: '700px',
    maxHeight: '400px',
  },
}));

const AdvancedFilters = ({ tooltipAdvancedFilter, advancedFilters }) => {
  const { applyFiltersLabel } = advancedFilters;
  return (
    <div>
      <div style={{ height: '70px', padding: '20px' }}>
        <Typography variant="h6" id="tableTitle">
          {tooltipAdvancedFilter || 'Advanced Filters'}
        </Typography>
      </div>
      <Divider />
      <div style={{ height: '70px' }}>
        <Button
          variant="text"
          style={{ width: '100%', borderRadius: 0, top: '25%' }}
          color="primary"
        >
          {applyFiltersLabel || 'Apply Filters'}
        </Button>
      </div>
    </div>
  );
};

const TableAdvancedFilters = ({
  tooltipAdvancedFilter,
  advancedFiltersComponent,
  advancedFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  if (!advancedFiltersComponent && !advancedFilters) return null;

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
              advancedFilters={advancedFilters}
              tooltipAdvancedFilter={tooltipAdvancedFilter}
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
