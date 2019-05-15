import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Input } from '../Inputs/Input';
import { Select } from '../Select/Select';

const filterStyles = makeStyles(theme => ({
  group: {
    padding: '20px',
  },
  filterContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  filter: {
    padding: '2px',
  },
}));

const advancedFilterStyles = makeStyles(theme => ({
  title: {
    height: '50px',
    padding: '20px',
  },
  panelButton: {
    height: '70px',
  },
  button: {
    width: '100%',
    borderRadius: 0,
    top: '25%',
  },
}));

const onChangeFilter = (setAdvancedFilters, name, value) => {
  setAdvancedFilters(prevAdvancedFilters => {
    const newAdvancedFilters = { ...prevAdvancedFilters };
    newAdvancedFilters[name] = value;
    return newAdvancedFilters;
  });
};

const mapFilterOptionToInput = (
  { type, name, label, options },
  setAdvancedFilters,
  advancedFilters
) => {
  if (type === 'input' || type === 'date' || type === 'time') {
    return (
      <Input
        key={name}
        name={name}
        value={advancedFilters[name]}
        label={label}
        mask={type === 'date' || type === 'time' ? type : null}
        onChange={event =>
          onChangeFilter(setAdvancedFilters, name, event.target.value)
        }
      />
    );
  }
  if (type === 'select' || type === 'multi-select') {
    return (
      <Select
        key={name}
        options={options}
        value={advancedFilters[name]}
        label={label}
        isMulti={type === 'multi-select'}
        onChange={value => onChangeFilter(setAdvancedFilters, name, value)}
      />
    );
  }
  if (type === 'checkbox') {
    return (
      <FormControlLabel
        style={{ marginTop: 3 }}
        control={
          <Checkbox
            style={{ paddingRight: 5 }}
            key={name}
            onChange={event =>
              onChangeFilter(setAdvancedFilters, name, event.target.checked)
            }
            checked={advancedFilters[name]}
          />
        }
        label={label}
      />
    );
  }
  return null;
};

const Filters = ({
  filtersOptions,
  setAdvancedFilters,
  advancedFilters,
  filtersGroup,
}) => {
  const filtersByGroup = {};
  const classes = filterStyles();

  if (filtersGroup && filtersGroup.length > 0) {
    filtersGroup.forEach(group => {
      filtersByGroup[group.name] = {
        label: group.label,
        filters: filtersOptions.filter(filter => filter.group === group.name),
      };
    });
  }

  filtersByGroup['no-group'] = {
    label: '',
    filters: filtersOptions.filter(filter => !filter.group),
  };

  return Object.keys(filtersByGroup).map(key => {
    const group = filtersByGroup[key];

    if (!group.filters || group.filters.length === 0) {
      return null;
    }

    return [
      <Divider key={`divider-${key}`} />,
      <div key={`group-${key}`} className={classes.group}>
        <Typography variant="subtitle2">{group.label}</Typography>
        <div className={classes.filterContainer}>
          {group.filters.map(filter => (
            <div key={`filter-${filter.name}`} className={classes.filter}>
              {mapFilterOptionToInput(
                filter,
                setAdvancedFilters,
                advancedFilters
              )}
            </div>
          ))}
        </div>
      </div>,
    ];
  });
};

const AdvancedFilters = ({
  tooltipAdvancedFilter,
  advancedFilters: advancedFiltersProp,
  onApplyFilter,
  filters,
}) => {
  const {
    applyFiltersLabel,
    filters: filtersOptions,
    filtersGroup,
  } = advancedFiltersProp;
  const [advancedFilters, setAdvancedFilters] = useState({
    ...filters.advancedFilters,
  });
  const classes = advancedFilterStyles();

  return (
    <div>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          {tooltipAdvancedFilter || 'Advanced Filters'}
        </Typography>
      </div>
      <Filters
        filtersOptions={filtersOptions}
        setAdvancedFilters={setAdvancedFilters}
        advancedFilters={advancedFilters}
        filtersGroup={filtersGroup}
      />
      <Divider />
      <div className={classes.panelButton}>
        <Button
          onClick={() => onApplyFilter(advancedFilters)}
          variant="text"
          className={classes.button}
          color="primary"
        >
          {applyFiltersLabel || 'Apply Filters'}
        </Button>
      </div>
    </div>
  );
};

export default AdvancedFilters;
