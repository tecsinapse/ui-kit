import React, { useContext, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/styles';
import { LocaleContext } from '@tecsinapse/ui-kit';

const styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#F7F7F7',
  },
  title: {
    color: theme.palette.text.secondary,
    fontSize: '0.8rem',
    paddingTop: '6px',
  },
  card: {
    marginLeft: theme.spacing(1),
    padding: '5px',
  },
}));

const cardStyles = makeStyles(theme => ({
  card: {
    marginLeft: theme.spacing(1),
    padding: '5px',
    cursor: 'pointer',
  },
  popover: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '300px',
    justifyContent: 'space-evenly',
  },
  chipContainer: {
    padding: '3px',
  },
  chip: {
    fontWeight: '500',
  },
}));

const CardFilter = ({ title, selectedValues, onDelete }) => {
  const classes = cardStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <div>
      <Paper
        className={classes.card}
        onClick={event => setAnchorEl(event.currentTarget)}
      >
        <Typography variant="subtitle2">{title}</Typography>
      </Paper>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <div className={classes.popover}>
          {selectedValues.map((value, index) => (
            <div key={value} className={classes.chipContainer}>
              <Chip
                label={`${value}`}
                className={classes.chip}
                onDelete={() => {
                  onDelete(index);
                  setAnchorEl(false);
                }}
              />
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
};

const onApplyAdvFilter = (setFilters, setPage, rowsPerPage) => filters => {
  setFilters(prevFilters => ({
    ...prevFilters,
    ...filters,
    startIndex: 0,
    stopIndex: rowsPerPage - 1,
  }));
  setPage(0);
};

const checkTypeAndApply = (
  setFilters,
  filters,
  setPage,
  rowsPerPage,
  name,
  i
) => {
  const type = typeof filters.advancedFilters[name];

  if (type === 'string') {
    // eslint-disable-next-line no-param-reassign
    filters.advancedFilters[name] = '';
  } else if (type === 'boolean') {
    // eslint-disable-next-line no-param-reassign
    filters.advancedFilters[name] = !filters.advancedFilters[name];
  } else {
    filters.advancedFilters[name].splice(i, 1);
  }
  onApplyAdvFilter(setFilters, setPage, rowsPerPage)(filters);
};

const filterOptions = (options, value) => {
  if (options && options.length > 0 && value && value.length > 0) {
    return options
      .filter(option => value.indexOf(option.value) > -1)
      .map(option => option.label);
  }

  return value;
};

const SelectedFilters = ({
  advancedFilters,
  filters,
  setFilters,
  setPage,
  rowsPerPage,
}) => {
  const [filtersSelected, setFiltersSelected] = useState([]);

  useEffect(() => {
    if (!advancedFilters) {
      return [];
    }
    const selectedFilters = advancedFilters.filters
      .filter(({ name, options }) => {
        const value = filterOptions(options, filters.advancedFilters[name]);

        return (
          (value && value.length > 0) || (value && typeof value === 'boolean')
        );
      })
      .map(({ name, label, options }) => {
        const value = filterOptions(options, filters.advancedFilters[name]);

        return {
          name,
          label,
          values: Array.isArray(value) ? value : [value],
        };
      });

    setFiltersSelected(selectedFilters);

    return undefined; // Returning undefined due to React warning on console
  }, [advancedFilters, filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = styles();
  const {
    Table: { selectedFiltersLabel },
  } = useContext(LocaleContext);

  if (filtersSelected.length === 0) {
    return null;
  }

  return (
    <>
      <Divider />
      <div className={classes.container}>
        <Typography variant="subtitle2" className={classes.title}>
          {selectedFiltersLabel}:
        </Typography>
        {filtersSelected.map(({ name, label, values }) => (
          <CardFilter
            key={name}
            title={label}
            selectedValues={values}
            onDelete={i => {
              checkTypeAndApply(
                setFilters,
                filters,
                setPage,
                rowsPerPage,
                name,
                i
              );
            }}
          />
        ))}
      </div>
      <Divider />
    </>
  );
};

export default SelectedFilters;
