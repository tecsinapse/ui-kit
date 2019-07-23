import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import { resolveObj } from '@tecsinapse/es-utils/core/object';
import { Input } from '../Inputs/Input';
import { Select } from '../Select/Select';
import {
  EXACT_MATCH_CONST,
  INCLUDE_MATCH_CONST,
  isRemoteData,
} from './tableFunctions';
import { LocaleContext } from '../LocaleProvider';

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

const TableRowFilter = ({ columns, rendered, onChangeFilter, data }) => {
  const [headerFilters, setHeaderFilters] = useState(
    initialHeaderFilters(columns)
  );

  const { selectPromptMessage, selectAllMessage } = useContext(LocaleContext);

  if (!rendered) {
    return null;
  }

  return (
    <TableRow>
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
        return (
          <TableCell key={field} align={options.numeric ? 'right' : 'left'}>
            {filter && select && (
              <Select
                selectPromptMessage={selectPromptMessage}
                selectAllMessage={selectAllMessage}
                value={filterValue}
                fullWidth
                options={selectOptions || []}
                menuPlacement="auto"
                onChange={value =>
                  onChange(onChangeFilter, setHeaderFilters)({
                    target: {
                      name: field,
                      value,
                      matchType: EXACT_MATCH_CONST,
                    },
                  })
                }
                label={title}
              />
            )}
            {filter && !select && (
              <Input
                name={field}
                value={filterValue}
                startAdornment={
                  <Icon path={mdiMagnify} size={1} color="#C4C4C4" />
                }
                onChange={onChange(onChangeFilter, setHeaderFilters)}
              />
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

TableRowFilter.defaultProps = {
  rendered: false,
};

TableRowFilter.propTypes = {
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
};

export default TableRowFilter;
