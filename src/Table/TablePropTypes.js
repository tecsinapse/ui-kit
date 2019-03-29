import PropTypes from 'prop-types';

export const toolbarOptionsTypes = PropTypes.shape({
  title: PropTypes.string,
  selectedLabel: PropTypes.func,
  tooltipAdvancedFilter: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string,
      tooltip: PropTypes.string,
      iconLeft: PropTypes.object,
      iconRight: PropTypes.object,
      onClick: PropTypes.func.isRequired,
    })
  ),
  advancedFilters: PropTypes.shape({
    selectedFiltersLabel: PropTypes.string,
    applyFiltersLabel: PropTypes.string,
    applyFilters: PropTypes.func,
    filtersGroup: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
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
      })
    ),
  }),
});

export const paginationOptions = {
  pagination: PropTypes.bool,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  rowCount: PropTypes.number.isRequired,
};
