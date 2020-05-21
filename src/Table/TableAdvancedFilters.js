import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';

import { LocaleContext } from '@tecsinapse/ui-kit/build/LocaleProvider';
import Drawer from '@material-ui/core/Drawer';
import AdvancedFilters from './AdvancedFilters';

const onApplyFilter = (setFilters, setOpen) => advancedFilters => {
  setFilters(prevFilters => ({
    ...prevFilters,
    advancedFilters,
    page: 0,
    startIndex: 0,
    stopIndex: prevFilters.rowsPerPage - 1,
  }));
  setOpen(false);
};

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const TableAdvancedFilters = ({
  advancedFilters,
  setFilters,
  filters,
  mobile,
  customAdvancedFilters,
}) => {
  const [open, setOpen] = React.useState(false);

  const {
    Table: { tooltipAdvancedFilter },
  } = useContext(LocaleContext);

  if (!advancedFilters) {
    return null;
  }
  const {
    maxHeight = '100%',
    maxWidth = mobile ? '1000' : '350px',
  } = advancedFilters;

  const maxSizeAdvancedFilters = {
    maxHeight,
    maxWidth,
  };

  return (
    <>
      <Tooltip title={tooltipAdvancedFilter}>
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
        >
          <FilterIcon />
        </IconButton>
      </Tooltip>
      {!mobile ? (
        <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
          <div style={maxSizeAdvancedFilters}>
            <AdvancedFilters
              advancedFilters={advancedFilters}
              onApplyFilter={onApplyFilter(setFilters, setOpen)}
              setFilters={setFilters}
              filters={filters}
              customAdvancedFilters={customAdvancedFilters}
              closeDialog={() => setOpen(false)}
            />
          </div>
        </Drawer>
      ) : (
        <Dialog
          fullScreen
          open={open}
          onClose={() => setOpen(false)}
          TransitionComponent={Transition}
        >
          <div style={maxSizeAdvancedFilters}>
            <AdvancedFilters
              advancedFilters={advancedFilters}
              onApplyFilter={onApplyFilter(setFilters, setOpen)}
              setFilters={setFilters}
              filters={filters}
              mobile={mobile}
              closeDialog={() => setOpen(false)}
              customAdvancedFilters={customAdvancedFilters}
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
