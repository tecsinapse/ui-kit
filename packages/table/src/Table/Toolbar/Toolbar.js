import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Toolbar as ToolbarMUI, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { LocaleContext } from '@tecsinapse/ui-kit/build/LocaleProvider';
import { verifyIfString } from '@tecsinapse/es-utils/build/object';
import SelectionActions from './SelectionActions/SelectionActions';
import AdvancedFilters from '../AdvancedFilters/AdvancedFilters';
import { toolbarOptionsTypes } from '../utils/propTypes';
import Exporter from '../Exporter/Exporter';
import SelectedFilters from './SelectedFilters/SelectedFilters';

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
      <ToolbarMUI className={classes.toolbar}>
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
            <Exporter
              {...exportOptions}
              data={data}
              columns={columns}
              filters={filters}
              setLoading={setLoading}
              rowCount={rowCount}
            />
          )}
          <AdvancedFilters
            tooltipAdvancedFilter={tooltipAdvancedFilter}
            advancedFilters={advancedFilters}
            setFilters={setFilters}
            filters={filters}
            mobile={mobile}
            customAdvancedFilters={customAdvancedFilters}
          />
        </div>
      </ToolbarMUI>
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

const Toolbar = ({
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

  return <SelectionActions options={options} selectedRows={selectedRows} />;
};

Toolbar.defaultProps = {
  selectedRows: [],
  selection: false,
  tableToolbarHide: false,
  options: null,
};

Toolbar.propTypes = {
  selectedRows: PropTypes.arrayOf(PropTypes.object),
  selection: PropTypes.bool,
  tableToolbarHide: PropTypes.bool,
  options: toolbarOptionsTypes,
};

export default Toolbar;
