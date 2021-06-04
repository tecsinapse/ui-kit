import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import { resolveObj } from '@tecsinapse/es-utils/build';
import { Input, Select, LocaleContext } from '@tecsinapse/ui-kit';
import { debounce } from '@material-ui/core';

import {
  EXACT_MATCH_CONST,
  INCLUDE_MATCH_CONST,
  isRemoteData,
} from '../../utils/tableFunctions';

const onChange = (onChangeFilter, setHeaderFilters) => ({ target }) => {
  const { name } = target;
  const { value: filterValue, matchType = INCLUDE_MATCH_CONST } = target;

  setHeaderFilters(prevHeaderFilters => {
    const newHeaderFilter = {};

    newHeaderFilter[name] = { value: filterValue, matchType };
    const mergedHeaderFilters = { ...prevHeaderFilters, ...newHeaderFilter };

    onChangeFilter(mergedHeaderFilters);

    return mergedHeaderFilters;
  });
};

const initialHeaderFilters = columns => {
  const headerFilters = {};

  columns
    .filter(c => !c.selection && !c.actions)
    .forEach(c => {
      headerFilters[c.field] = {
        value: '',
        matchType: c.select ? EXACT_MATCH_CONST : INCLUDE_MATCH_CONST,
      };
    });

  return headerFilters;
};

const RowFilters = ({
  columns,
  rendered,
  onChangeFilter,
  data,
  hideSelectFilterLabel,
  headerFiltersDebounceTime = 700,
}) => {
  const [headerFilters, setHeaderFilters] = useState(
    initialHeaderFilters(columns)
  );

  const debounceChange = useCallback(
    debounce(value => {
      onChangeFilter(value);
    }, headerFiltersDebounceTime),
    [onChangeFilter]
  );

  const handleDebouncedChange = value => {
    debounceChange(value);
  };

  const { selectPromptMessage, selectAllMessage } = useContext(LocaleContext);

  if (!rendered) {
    return null;
  }

  const rowFilterStyle = { backgroundColor: '#f5f5f5' };

  return (
    <TableRow style={rowFilterStyle}>
      {columns.map(column => {
        const { title, field, options = {} } = column || {};

        const {
          visible = true,
          select = false,
          filter = false,
          selectOptions: selectOptionsProps,
        } = options;

        if (!visible) {
          return null;
        }

        let selectOptions;

        if (select && !selectOptionsProps && !isRemoteData(data)) {
          selectOptions = [...new Set(data.map(o => resolveObj(field, o)))].map(
            value => ({
              value,
              label: value,
            })
          );
        } else {
          selectOptions = [...(selectOptionsProps || [])];
        }
        selectOptions = [
          {
            value: '',
            label: `${selectPromptMessage}...`,
          },
          ...selectOptions,
        ];
        const { value: filterValue } = headerFilters[field] || {};
        const handleChange = value => {
          onChange(
            onChangeFilter,
            setHeaderFilters
          )({
            target: {
              name: field,
              value,
              matchType: EXACT_MATCH_CONST,
            },
          });
        };
        const regularInputStyle = { backgroundColor: '#fff' };
        const customSelectStyle = {
          style: {
            backgroundColor: '#fff',
          },
        };
        const cellPadding = { paddingTop: '8px', paddingBottom: '8px' };

        return (
          <TableCell
            key={field}
            align={options.numeric ? 'right' : 'left'}
            style={cellPadding}
          >
            {filter && select && (
              <Select
                selectPromptMessage={selectPromptMessage}
                customTextField={customSelectStyle}
                selectAllMessage={selectAllMessage}
                value={filterValue}
                fullWidth
                options={selectOptions || []}
                menuPlacement="auto"
                onChange={handleChange}
                label={!hideSelectFilterLabel && title}
              />
            )}
            {filter && !select && (
              <Input
                name={field}
                id={field}
                value={filterValue}
                startAdornment={
                  <Icon path={mdiMagnify} size={1} color="#C4C4C4" />
                }
                style={regularInputStyle}
                fullWidth
                onChange={onChange(handleDebouncedChange, setHeaderFilters)}
              />
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

RowFilters.defaultProps = {
  rendered: false,
  hideSelectFilterLabel: false,
  headerFiltersDebounceTime: 700,
};

RowFilters.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      field: PropTypes.string,
      options: PropTypes.shape({
        filter: PropTypes.bool,
      }),
    })
  ).isRequired,
  rendered: PropTypes.bool,
  onChangeFilter: PropTypes.func.isRequired,
  hideSelectFilterLabel: PropTypes.bool,
  headerFiltersDebounceTime: PropTypes.number,
};

export default RowFilters;
