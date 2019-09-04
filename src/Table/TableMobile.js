import React, { useContext, createRef } from 'react';
import PropTypes from 'prop-types';
import { isEmptyOrNull } from '@tecsinapse/es-utils/core/object';
import { VisibilityOff } from '@material-ui/icons';
import {
  CellMeasurer,
  List,
  AutoSizer,
  CellMeasurerCache,
} from 'react-virtualized';

import { LocaleContext } from '../LocaleProvider';
import { EmptyStateWrapper } from '../EmptyState/EmptyState';
import { TableCard } from './TableCard';

const cache = new CellMeasurerCache({
  defaultHeight: 300,
  fixedWidth: true,
});

export const TableMobile = ({ columns, data, rowId, onRowClick }) => {
  const listRef = createRef();

  const {
    Table: { emptyStateTitle, emptyStateMessage },
  } = useContext(LocaleContext);

  if (isEmptyOrNull(columns)) {
    return null;
  }

  if (isEmptyOrNull(data)) {
    return (
      <EmptyStateWrapper
        IconComponent={VisibilityOff}
        titleMessage={emptyStateTitle}
        message={emptyStateMessage}
      />
    );
  }

  return (
    <AutoSizer>
      {({ width, height }) => (
        <List
          ref={listRef}
          width={width}
          height={height}
          rowCount={data.length}
          deferredMeasurementCache={cache}
          rowHeight={cache.rowHeight}
          rowRenderer={({ index, key, parent, style }) => (
            <CellMeasurer
              cache={cache}
              columnIndex={0}
              key={key}
              parent={parent}
              rowIndex={index}
            >
              <div style={style}>
                <TableCard
                  clearCache={() => cache.clear(index, 0)}
                  data={data[index]}
                  updateList={() => {
                    listRef.current.recomputeRowHeights(index);
                    listRef.current.forceUpdateGrid();
                  }}
                  onRowClick={onRowClick}
                  rowId={rowId(data[index])}
                  columns={columns}
                />
              </div>
            </CellMeasurer>
          )}
        />
      )}
    </AutoSizer>
  );
};

TableMobile.defaultProps = {
  columns: [],
  data: [],
};

TableMobile.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      field: PropTypes.string,
      options: PropTypes.shape({
        filter: PropTypes.bool,
      }),
    })
  ),
  data: PropTypes.arrayOf(PropTypes.object),
  rowId: PropTypes.func.isRequired,
};

export default TableMobile;
