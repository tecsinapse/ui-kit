import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@mdi/react';
import IconButton from '@material-ui/core/IconButton';
import { mdiDownload } from '@mdi/js';
import { exportToCSV } from './tableFunctions';

const defaultLabelToCSV = 'Export to CSV';

const exportData = (
  type,
  exportFileName,
  columns,
  data,
  setAnchorEl,
  delimeter
) => {
  if (type === 'csv') {
    exportToCSV(exportFileName, columns, data, delimeter);
  }
  setAnchorEl(null);
};

const TableExporter = ({ exportFileName, exportTypes, data, columns }) => {
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
                delimeter
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
  data: PropTypes.arrayOf(PropTypes.object),
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
