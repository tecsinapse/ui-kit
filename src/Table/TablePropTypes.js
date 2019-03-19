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
});

export const paginationOptions = {
  pagination: PropTypes.bool,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  rowCount: PropTypes.number.isRequired,
};
