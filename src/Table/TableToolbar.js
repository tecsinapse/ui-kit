import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import TableToolbarSelection from './TableToolbarSelection';
import TableAdvancedFilters from './TableAdvancedFilters';
import { toolbarOptionsTypes } from './TablePropTypes';
import TableExporter from './TableExporter';

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

const SimpleToolbar = ({
  options,
  exportOptions = {},
  data,
  columns,
  filters,
  setLoading,
  rowCount,
}) => {
  const { title, tooltipAdvancedFilter, advancedFiltersComponent } =
    options || {};
  const classes = tableToolbarStyles();

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          {title}
        </Typography>
      </div>
      <div className={classes.filter}>
        <TableExporter
          {...exportOptions}
          data={data}
          columns={columns}
          filters={filters}
          setLoading={setLoading}
          rowCount={rowCount}
        />
        <TableAdvancedFilters
          tooltipAdvancedFilter={tooltipAdvancedFilter}
          advancedFiltersComponent={advancedFiltersComponent}
        />
      </div>
    </Toolbar>
  );
};

const TableToolbar = ({
  options,
  selectedRows,
  selection,
  exportOptions,
  data,
  columns,
  filters,
  setLoading,
  rowCount,
}) => {
  if (!options && !selection && !exportOptions) return null;

  if (selectedRows.length === 0) {
    return (
      <SimpleToolbar
        options={options}
        exportOptions={exportOptions}
        data={data}
        filters={filters}
        columns={columns}
        setLoading={setLoading}
        rowCount={rowCount}
      />
    );
  }

  return (
    <TableToolbarSelection options={options} selectedRows={selectedRows} />
  );
};

TableToolbar.defaultProps = {
  selectedRows: [],
  selection: false,
  options: null,
};

TableToolbar.propTypes = {
  selectedRows: PropTypes.arrayOf(PropTypes.object),
  selection: PropTypes.bool,
  options: toolbarOptionsTypes,
};

export default TableToolbar;
