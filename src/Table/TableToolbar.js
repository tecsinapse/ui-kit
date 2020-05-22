import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { LocaleContext } from '@tecsinapse/ui-kit/build/LocaleProvider';
import { verifyIfString } from '@tecsinapse/es-utils/build/object';
import TableToolbarSelection from './TableToolbarSelection';
import TableAdvancedFilters from './TableAdvancedFilters';
import { toolbarOptionsTypes } from './propTypes';
import TableExporter from './TableExporter';
import SelectedFilters from './SelectedFilters';

const tableToolbarStyles = makeStyles(theme => ({
  toolbar: {
    margin: theme.spacing(1 / 2, 1 / 2, 0, 1 / 2),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    minHeight: '48px',
    justifyContent: 'space-between',
  },
  title: {
    width: '100%',
  },
  filter: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const SimpleToolbar = ({
  options,
  exportOptions = {},
  data,
  columns,
  filters,
  setFilters,
  setLoading,
  rowCount,
  mobile,
  customAdvancedFilters,
}) => {
  const { title, advancedFilters } = options || {};
  const classes = tableToolbarStyles();
  const {
    Table: { tooltipAdvancedFilter },
  } = useContext(LocaleContext);
  const { exportTypes } = exportOptions || {};

  if (
    !advancedFilters &&
    !title &&
    (!exportTypes || exportTypes.length === 0 || !exportTypes?.position)
  ) {
    return null;
  }

  const isTitleString = verifyIfString(title);

  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          {isTitleString ? (
            <Typography variant="h6" id="tableTitle">
              {title}
            </Typography>
          ) : (
            title
          )}
        </div>
        <div className={classes.filter}>
          {exportOptions?.position !== 'footer' && (
            <TableExporter
              {...exportOptions}
              data={data}
              columns={columns}
              filters={filters}
              setLoading={setLoading}
              rowCount={rowCount}
            />
          )}
          <TableAdvancedFilters
            tooltipAdvancedFilter={tooltipAdvancedFilter}
            advancedFilters={advancedFilters}
            setFilters={setFilters}
            filters={filters}
            mobile={mobile}
            customAdvancedFilters={customAdvancedFilters}
          />
        </div>
      </Toolbar>
      {advancedFilters && (
        <SelectedFilters
          advancedFilters={advancedFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </div>
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
  setFilters,
  setLoading,
  rowCount,
  tableToolbarHide = false,
  mobile = false,
  customAdvancedFilters,
}) => {
  if (tableToolbarHide) {
    return null;
  }
  if (!options && !selection && !exportOptions) {
    return null;
  }

  if (selectedRows.length === 0) {
    return (
      <SimpleToolbar
        options={options}
        exportOptions={exportOptions}
        data={data}
        filters={filters}
        setFilters={setFilters}
        columns={columns}
        setLoading={setLoading}
        rowCount={rowCount}
        mobile={mobile}
        customAdvancedFilters={customAdvancedFilters}
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
  tableToolbarHide: false,
  options: null,
};

TableToolbar.propTypes = {
  selectedRows: PropTypes.arrayOf(PropTypes.object),
  selection: PropTypes.bool,
  tableToolbarHide: PropTypes.bool,
  options: toolbarOptionsTypes,
};

export default TableToolbar;
