import PropTypes from 'prop-types';

export const toolbarOptionsTypes = PropTypes.shape({
  title: PropTypes.string,
  selectedLabel: PropTypes.func,
  tooltipAdvancedFilter: PropTypes.string,
  advancedFiltersComponent: PropTypes.object,
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
    applyFiltersLabel: PropTypes.string,
    filters: PropTypes.arrayOf(
      PropTypes.shape({
        group: PropTypes.string,
        type: PropTypes.oneOf([
          'input',
          'select',
          'multi-select',
          'date',
          'time',
          'date-time',
        ]),
        name: PropTypes.string,
        label: PropTypes.string,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.string,
            disabled: PropTypes.bool,
          })
        ),
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.arrayOf(PropTypes.string),
        ]),
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
