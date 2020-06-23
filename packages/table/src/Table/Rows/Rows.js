import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { isEmptyOrNull } from '@tecsinapse/es-utils/build';
import { TableCell } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import { VisibilityOff } from '@material-ui/icons';
import { EmptyStateWrapper } from '@tecsinapse/ui-kit';
import { LocaleContext } from '@tecsinapse/ui-kit/build/LocaleProvider';
import { Cells } from './Cells/Cells';
import { handleRowClick } from '../utils/tableFunctions';

const tableRowStyles = hasSelection =>
  makeStyles(theme => ({
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#F5F5F5',
      },
      cursor: hasSelection ? 'pointer' : '',
    },
  }));

const Rows = ({
  columns,
  data,
  selectedRows,
  setSelectedRows,
  onSelectRow,
  rowId,
  onRowClick,
  forceCollapseActions,
  verticalActions,
  empytStateComponent,
  customRow,
}) => {
  const hasSelection = (columns || []).some(({ selection }) => selection);
  const classes = tableRowStyles(hasSelection || !!onRowClick)();

  const {
    Table: { emptyStateTitle, emptyStateMessage },
  } = useContext(LocaleContext);

  if (isEmptyOrNull(columns)) {
    return null;
  }

  if (isEmptyOrNull(data)) {
    return (
      <TableRow>
        <TableCell colSpan={columns.length}>
          {empytStateComponent || (
            <EmptyStateWrapper
              IconComponent={VisibilityOff}
              titleMessage={emptyStateTitle}
              message={emptyStateMessage}
            />
          )}
        </TableCell>
      </TableRow>
    );
  }

  return data.map(rowData =>
    customRow ? (
      customRow({
        rowData,
        rowId,
        columns,
        selectedRows,
        onSelectRow,
        setSelectedRows,
        onRowClick,
        forceCollapseActions,
        verticalActions,
      })
    ) : (
      <TableRow
        key={rowId(rowData)}
        hover
        className={classes.row}
        onClick={handleRowClick(
          rowData,
          hasSelection,
          onSelectRow,
          onRowClick,
          selectedRows,
          setSelectedRows,
          rowId
        )}
      >
        <Cells
          columns={columns}
          rowData={rowData}
          selectedRows={selectedRows}
          onSelectRow={onSelectRow}
          rowId={rowId}
          forceCollapseActions={forceCollapseActions}
          verticalActions={verticalActions}
        />
      </TableRow>
    )
  );
};

Rows.defaultProps = {
  columns: [],
  data: [],
  selectedRows: [],
  forceCollapseActions: false,
  empytStateComponent: undefined,
};

Rows.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      field: PropTypes.string,
      options: PropTypes.shape({
        filter: PropTypes.bool,
      }),
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object,
  selectedRows: PropTypes.arrayOf(PropTypes.object),
  onSelectRow: PropTypes.func,
  rowId: PropTypes.func.isRequired,
  forceCollapseActions: PropTypes.bool,
  empytStateComponent: PropTypes.node,
};

export default Rows;
