/* eslint-disable react/jsx-curly-newline */
import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { mdiArrowLeft } from '@mdi/js';
import Icon from '@mdi/react';

import { IconButton, Input, Select } from '@tecsinapse/ui-kit';
import { LocaleContext } from '@tecsinapse/ui-kit/build/LocaleProvider';
import { renderStyledColor } from '@tecsinapse/ui-kit/build/ThemeProvider';
import { Grid } from '@material-ui/core';

const filterStyles = mobile =>
  makeStyles(theme => ({
    group: {
      padding: mobile ? theme.spacing(1) : '20px',
    },
    filterContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    filter: {
      padding: '2px',
    },
    gridItemMarginTop: {
      margin: theme.spacing(1),
    },
    fullWidth: {
      width: '100%',
    },
  }));

const advancedFilterStyles = mobile =>
  makeStyles(theme => ({
    title: {
      height: mobile ? '20px' : '50px',
      padding: mobile ? '20px 0px 20px 0px' : '20px 20px 20px 20px',
      display: 'flex',
      alignItems: 'center',
    },
    panelButton: {
      height: '70px',
    },
    panelButtonMobile: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: mobile ? '75%' : '100%',
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
        fullWidth
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
        portal
        fullWidth
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
  mobile = false,
}) => {
  const filtersByGroup = {};
  const classes = filterStyles(mobile)();

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
      <Grid container spacing={1}>
        <div key={`group-${key}`} className={classes.group}>
          <Typography variant="subtitle2">{group.label}</Typography>
          <div className={classes.filterContainer}>
            {group.filters.map(filter => (
              <Grid
                item
                xs={12}
                md={6}
                xl={6}
                className={classes.gridItemMarginTop}
              >
                <div
                  key={`filter-${filter.name}`}
                  className={clsx(classes.filter, {
                    [classes.fullWidth]: filter.fullWidth,
                  })}
                  style={mobile ? { width: '100%' } : {}}
                >
                  {mapFilterOptionToInput(
                    filter,
                    setAdvancedFilters,
                    advancedFilters
                  )}
                </div>
              </Grid>
            ))}
          </div>
        </div>
      </Grid>,
    ];
  });
};

const AdvancedFilters = ({
  advancedFilters: advancedFiltersProp,
  onApplyFilter,
  filters,
  closeDialog,
  mobile = false,
}) => {
  const { variant } = useTheme();
  const { filters: filtersOptions, filtersGroup } = advancedFiltersProp;
  const [advancedFilters, setAdvancedFilters] = useState({
    ...filters.advancedFilters,
  });
  const {
    Table: { tooltipAdvancedFilter, applyFiltersLabel },
  } = useContext(LocaleContext);
  const classes = advancedFilterStyles(mobile)();

  return (
    <div>
      <div className={classes.title}>
        {mobile && (
          <IconButton onClick={closeDialog}>
            <Icon path={mdiArrowLeft} size={1} />
          </IconButton>
        )}
        <Typography variant="h6" id="tableTitle">
          {tooltipAdvancedFilter}
        </Typography>
      </div>
      <Filters
        filtersOptions={filtersOptions}
        setAdvancedFilters={setAdvancedFilters}
        advancedFilters={advancedFilters}
        filtersGroup={filtersGroup}
        mobile={mobile}
      />
      <Divider />
      <div
        className={clsx(classes.panelButton, {
          [classes.panelButtonMobile]: mobile,
        })}
      >
        <Button
          onClick={() => onApplyFilter(advancedFilters)}
          variant={mobile ? 'contained' : 'text'}
          className={classes.button}
          color={renderStyledColor(variant)}
        >
          {applyFiltersLabel}
        </Button>
      </div>
    </div>
  );
};

export default AdvancedFilters;
