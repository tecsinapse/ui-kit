import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { mdiArrowLeft, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

import {
  IconButton,
  Input,
  Select,
  LocaleContext,
  renderStyledColor,
} from '@tecsinapse/ui-kit';

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
      padding: mobile ? theme.spacing(2 / 3) : 0,
    },
    fullWidth: {
      width: '100%',
    },
  }));

const advancedFilterStyles = mobile =>
  makeStyles(({ spacing }) => ({
    title: {
      height: mobile ? '20px' : '50px',
      padding: mobile ? '20px 0px 20px 0px' : '20px 20px 20px 20px',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px #ccc solid',
    },
    panelButton: {
      height: '60px',
      borderTop: '1px #ccc solid',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    panelButtonMobile: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    button: {
      width: '75%',
      marginTop: spacing(1),
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
    const margin3 = { marginTop: 3 };
    const padding5 = { paddingRight: 5 };

    return (
      <FormControlLabel
        style={margin3}
        control={
          <Checkbox
            style={padding5}
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

  return Object.keys(filtersByGroup).map((key, idx) => {
    const group = filtersByGroup[key];

    if (!group.filters || group.filters.length === 0) {
      return null;
    }

    const style = { marginLeft: mobile && '10px' };

    return [
      idx > 0 && <Divider key={`divider-${key}`} />,
      <div key={`group-${key}`} className={classes.group}>
        <Typography variant="subtitle2" style={style}>
          {group.label}
        </Typography>
        <Grid container className={classes.filterContainer}>
          {group.filters.map(filter => {
            const mobileWidth = mobile ? { width: '100%' } : {};

            return (
              <Grid
                item
                xs={12}
                className={classes.gridItemMarginTop}
                key={filter.name}
              >
                <div
                  key={`filter-${filter.name}`}
                  className={clsx(classes.filter, {
                    [classes.fullWidth]: filter.fullWidth,
                  })}
                  style={mobileWidth}
                >
                  {mapFilterOptionToInput(
                    filter,
                    setAdvancedFilters,
                    advancedFilters
                  )}
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>,
    ];
  });
};

const Container = ({
  advancedFilters: advancedFiltersProp,
  onApplyFilter,
  filters,
  closeDialog,
  mobile = false,
  customAdvancedFilters,
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

  const handleClick = () => {
    if (customAdvancedFilters) {
      customAdvancedFilters.applyFilters();
      closeDialog();
    } else {
      onApplyFilter(advancedFilters);
    }
  };

  return (
    <div>
      <div className={classes.title}>
        {mobile && (
          <IconButton onClick={closeDialog}>
            <Icon path={mdiArrowLeft} size={1} />
          </IconButton>
        )}
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Typography variant="h6" id="tableTitle">
            {tooltipAdvancedFilter}
          </Typography>
          {!mobile && (
            <IconButton onClick={closeDialog}>
              <Icon path={mdiClose} size={1} />
            </IconButton>
          )}
        </Grid>
      </div>
      {!customAdvancedFilters ? (
        <Filters
          filtersOptions={filtersOptions}
          setAdvancedFilters={setAdvancedFilters}
          advancedFilters={advancedFilters}
          filtersGroup={filtersGroup}
          mobile={mobile}
        />
      ) : (
        customAdvancedFilters.filters
      )}
      <div
        className={clsx(classes.panelButton, {
          [classes.panelButtonMobile]: mobile,
        })}
      >
        <Button
          onClick={handleClick}
          variant="contained"
          className={classes.button}
          color={renderStyledColor(variant)}
          disableElevation
        >
          {applyFiltersLabel}
        </Button>
        {customAdvancedFilters?.cleanFilters && (
          <Button
            onClick={() => customAdvancedFilters.cleanFilters()}
            variant="outlined"
            className={classes.button}
            color={renderStyledColor(variant)}
            disableElevation
          >
            {customAdvancedFilters?.cleanFiltersLabel || 'Limpar Filtros'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Container;
