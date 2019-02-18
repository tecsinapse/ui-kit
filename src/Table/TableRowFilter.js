import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import { Input } from '../Inputs/Input';

const onChange = (column, onChangeFilter) => event => {
  /*eslint-disable*/
  column.filterValue = event.target.value;
  onChangeFilter();
};

const TableRowFilter = ({ columns, rendered, onChangeFilter }) => {
  if (!rendered) return null;
  return (
    <TableRow>
      {columns.map(column => {
        const { options } = column || {};
        return (
          <TableCell>
            {options.filter && (
              <Input
                style={{ height: 35 }}
                startAdornment={
                  <Icon path={mdiMagnify} size={1} color="#C4C4C4" />
                }
                onChange={onChange(column, onChangeFilter)}
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
};

export default TableRowFilter;
