import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@mdi/react';
import IconButton from '@material-ui/core/IconButton';
import { mdiDownload } from '@mdi/js';
import { exportToCSV, isRemoteData } from './tableFunctions';

const defaultLabelToCSV = 'Export to CSV';

const exportTo = (
  type,
  exportFileName,
  columns,
  data,
  delimeter,
  setAnchorEl
) => {
  if (type === 'csv') {
    exportToCSV(exportFileName, columns, data, delimeter);
  }
  setAnchorEl(null);
};

const exportData = async (
  type,
  exportFileName,
  columns,
  data,
  setAnchorEl,
  delimeter,
  filters,
  setLoading,
  rowCount
) => {
  setLoading(true);

  if (isRemoteData(data)) {
    data({ ...filters, ...{ page: 0, rowsPerPage: rowCount } }).then(
      ({ data: resultData }) => {
        exportTo(
          type,
          exportFileName,
          columns,
          resultData,
          delimeter,
          setAnchorEl
        );
        setLoading(false);
      }
    );
  } else {
    exportTo(type, exportFileName, columns, data, delimeter, setAnchorEl);
    setLoading(false);
  }
};

const TableExporter = ({
  exportFileName,
  exportTypes,
  data,
  columns,
  filters,
  setLoading,
  rowCount,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  if (!exportTypes || exportTypes.length === 0) return null;

  return (
    <React.Fragment>
      <IconButton onClick={event => setAnchorEl(event.currentTarget)}>
        <Icon path={mdiDownload} size={1} color="#757575" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {exportTypes.map(({ type, label, delimeter }) => (
          <MenuItem
            key={`export-${type}`}
            onClick={() =>
              exportData(
                type,
                exportFileName,
                columns,
                data,
                setAnchorEl,
                delimeter,
                filters,
                setLoading,
                rowCount
              )
            }
          >
            {label || defaultLabelToCSV}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

TableExporter.defaultProps = {
  data: [],
  exportFileName: 'table_exporter.csv',
  exportTypes: [],
};

TableExporter.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.func,
  ]),
  exportFileName: PropTypes.string,
  exportTypes: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['csv']),
      label: PropTypes.string,
      delimeter: PropTypes.string,
    })
  ),
};

export default TableExporter;
