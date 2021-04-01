import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@mdi/react';
import IconButton from '@material-ui/core/IconButton';
import { mdiDownload } from '@mdi/js';
import { Typography, useTheme } from '@material-ui/core';
import { Button, renderStyledColor } from '@tecsinapse/ui-kit';

import { exportToCSV, isRemoteData } from '../utils/tableFunctions';

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

const Exporter = ({
  exportFileName,
  exportTypes,
  position = 'header',
  data,
  columns,
  filters,
  setLoading,
  rowCount,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  if (!exportTypes || exportTypes.length === 0) {
    return null;
  }

  const handleExport = async (type, delimeter, exportFunc) => {
    if (exportFunc || type === 'custom') {
      exportFunc(data, columns);
      setAnchorEl(false);
    } else {
      await exportData(
        type,
        exportFileName,
        columns,
        data,
        setAnchorEl,
        delimeter,
        filters,
        setLoading,
        rowCount
      );
    }
  };

  if (position === 'footer') {
    const whiteSpace = { whiteSpace: 'nowrap' };
    const typoLabel = { fontWeight: '500', fontSize: '0.875rem' };

    return (
      <Button
        onClick={() => exportTypes[0]?.exportFunc()}
        style={whiteSpace}
        variant="contained"
        color={renderStyledColor(theme.variant)}
        size="small"
      >
        <Icon
          path={mdiDownload}
          size={1}
          color={theme.palette.primary.contrastText}
        />
        <Typography style={typoLabel}>{exportTypes[0]?.label}</Typography>
      </Button>
    );
  }

  return (
    <>
      <IconButton onClick={event => setAnchorEl(event.currentTarget)}>
        <Icon path={mdiDownload} size={1} color="#757575" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {exportTypes.map(({ type, label, delimeter, exportFunc }) => (
          <MenuItem
            key={`export-${type}`}
            onClick={() => handleExport(type, delimeter, exportFunc)}
          >
            {label || defaultLabelToCSV}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

Exporter.defaultProps = {
  data: [],
  exportFileName: 'table_exporter',
  exportTypes: [],
};

Exporter.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.func,
  ]),
  exportFileName: PropTypes.string,
  exportTypes: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['csv', 'custom']),
      label: PropTypes.string,
      delimeter: PropTypes.string,
      exportFunc: PropTypes.func,
    })
  ),
};

export default Exporter;
