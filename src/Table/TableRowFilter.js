import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import { Input } from '../Inputs/Input';

const onChange = (onChangeFilter, setHeaderFilters) => ({ target }) => {
  const { name } = target;
  const { value: filterValue } = target;

  setHeaderFilters(prevHeaderFilters => {
    const newHeaderFilter = {};
    newHeaderFilter[name] = filterValue;
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
      headerFilters[c.field] = '';
    });
  return headerFilters;
};

const TableRowFilter = ({ columns, rendered, onChangeFilter }) => {
  const [headerFilters, setHeaderFilters] = useState(
    initialHeaderFilters(columns)
  );

  if (!rendered) {
    return null;
  }

  return (
    <TableRow>
      {columns.map(column => {
        const { field, options = {} } = column || {};
        return (
          <TableCell key={field} align={options.numeric ? 'right' : 'left'}>
            {options.filter && (
              <Input
                name={field}
                value={headerFilters[field]}
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
