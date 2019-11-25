import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';

import AdvancedFilters from './AdvancedFilters';
import { LocaleContext } from '../LocaleProvider';

const onApplyFilter = (
  setAnchorEl,
  setFilters,
  setOpenDialog
) => advancedFilters => {
  setFilters(prevFilters => ({
    ...prevFilters,
    advancedFilters,
    page: 0,
    startIndex: 0,
    stopIndex: prevFilters.rowsPerPage - 1,
  }));
  setAnchorEl(null);
  setOpenDialog(false);
};

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const TableAdvancedFilters = ({
  advancedFilters,
  setFilters,
  filters,
  mobile,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const {
    Table: { tooltipAdvancedFilter },
  } = useContext(LocaleContext);

  if (!advancedFilters) {
    return null;
  }
  const open = Boolean(anchorEl);
  const { maxHeight = '100%', maxWidth = '700px' } = advancedFilters;

  const maxSizeAdvancedFilters = {
    maxHeight,
    maxWidth,
  };

  return (
    <>
      <Tooltip title={tooltipAdvancedFilter}>
        <IconButton
          onClick={event => {
            setOpenDialog(true);
            setAnchorEl(event.currentTarget);
          }}
        >
          <FilterIcon />
        </IconButton>
      </Tooltip>
      {!mobile ? (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <div style={maxSizeAdvancedFilters}>
            <AdvancedFilters
              advancedFilters={advancedFilters}
              onApplyFilter={onApplyFilter(
                setAnchorEl,
                setFilters,
                setOpenDialog
              )}
              setFilters={setFilters}
              filters={filters}
            />
          </div>
        </Popover>
      ) : (
        <Dialog
          fullScreen
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          TransitionComponent={Transition}
        >
          <div style={maxSizeAdvancedFilters}>
            <AdvancedFilters
              advancedFilters={advancedFilters}
              onApplyFilter={onApplyFilter(
                setAnchorEl,
                setFilters,
                setOpenDialog
              )}
              setFilters={setFilters}
              filters={filters}
              mobile={mobile}
              closeDialog={() => setOpenDialog(false)}
            />
          </div>
        </Dialog>
      )}
    </>
  );
};

TableAdvancedFilters.defaultProps = {
  advancedFilters: null,
};

TableAdvancedFilters.propTypes = {
  advancedFilters: PropTypes.shape({
    applyFilters: PropTypes.func,
    filtersGroup: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
      })
    ),
    filters: PropTypes.arrayOf(
      PropTypes.shape({
        group: PropTypes.string,
        type: PropTypes.oneOf([
          'input',
          'select',
          'multi-select',
          'date',
          'time',
          'checkbox',
        ]).isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.string,
            disabled: PropTypes.bool,
          })
        ),
        value: PropTypes.any,
        fullWidth: PropTypes.bool,
      })
    ),
  }),
};

export default TableAdvancedFilters;
