import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { isEmptyOrNull } from '@tecsinapse/es-utils/core/object';
import { VisibilityOff } from '@material-ui/icons';
import {
  CellMeasurer,
  List,
  AutoSizer,
  CellMeasurerCache,
  InfiniteLoader,
} from 'react-virtualized';

import { LocaleContext } from '../LocaleProvider';
import { EmptyStateWrapper } from '../EmptyState/EmptyState';
import { TableCard } from './TableCard';

export const TableMobile = ({
  columns,
  data,
  rowId,
  onRowClick,
  actions,
  rowCount,
  onChangeStartStopIndex,
}) => {
  const list = useRef();

  const cache = new CellMeasurerCache({
    defaultHeight: 300,
    fixedWidth: true,
  });

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

  const isRowLoaded = ({ index }) => !!data[index];

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={onChangeStartStopIndex}
      rowCount={rowCount}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
          {({ width, height }) => (
            <List
              onRowsRendered={onRowsRendered}
              ref={ref => {
                // InfinityLoader and TableCard need to access to the list updater
                // TableCard is a functional ref, while InfinityLoader approaches as a class ref
                if (ref) {
                  registerChild(ref);
                  list.current = ref;
                }
              }}
              width={width}
              height={height}
              rowCount={rowCount}
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
                        list.current.recomputeRowHeights(index);
                        list.current.forceUpdateGrid();
                      }}
                      onRowClick={onRowClick}
                      columns={columns}
                      actions={actions}
                      key={key}
                      rowId={key}
                    />
                  </div>
                </CellMeasurer>
              )}
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
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
