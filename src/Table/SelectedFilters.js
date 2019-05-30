import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing.unit,
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
    marginLeft: theme.spacing.unit,
    padding: '5px',
  },
}));

const cardStyles = makeStyles(theme => ({
  card: {
    marginLeft: theme.spacing.unit,
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

const CardFilter = ({ title, selectedValues }) => {
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
          {selectedValues.map(value => (
            <div key={value} className={classes.chipContainer}>
              <Chip label={`${value}`} className={classes.chip} />
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
};

const SelectedFilters = ({ advancedFilters, filters }) => {
  if (!advancedFilters) {
    return null;
  }

  const classes = styles();
  const selectedFilters = [];
  const { selectedFiltersLabel } = advancedFilters;

  advancedFilters.filters.forEach(({ name, label }) => {
    const value = filters.advancedFilters[name];
    if ((value && value.length > 0) || (typeof value === 'boolean' && value)) {
      selectedFilters.push({
        name,
        label,
        values: Array.isArray(value) ? value : [value],
      });
    }
  });

  return (
    <React.Fragment>
      <Divider />
      <div className={classes.container}>
        <Typography variant="subtitle2" className={classes.title}>
          {selectedFiltersLabel || 'Selected Filters'}:
        </Typography>
        {selectedFilters.map(({ name, label, values }) => (
          <CardFilter key={name} title={label} selectedValues={values} />
        ))}
      </div>
      <Divider />
    </React.Fragment>
  );
};

export default SelectedFilters;
