import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import React from 'react';
import { makeStyles } from '@material-ui/core';

export const useCustomRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  style: { borderLeft: '3px red solid' },
  style1: { paddingTop: 0, paddingBottom: '8px' },
  style2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  style3: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  style4: {
    backgroundColor: 'green',
    borderRadius: '10px',
    padding: '3px 5px 2px 5px',
    fontSize: '10px',
    color: 'white',
    fontWeight: '700',
  },
});

export const columnsSimple = [
  {
    title: 'Brand',
    field: 'brand',
  },
  {
    title: 'Model',
    field: 'model.name',
    options: {
      hiddenCard: true,
    },
  },
  {
    title: 'Year',
    field: 'model.year',
    options: {
      numeric: true,
      hiddenCard: true,
    },
  },
];

export const columnsAction = [
  {
    title: 'Brand',
    field: 'brand',
  },
  {
    title: 'Model',
    field: 'model.name',
  },
  {
    title: 'Year',
    field: 'model.year',
    options: {
      numeric: true,
    },
  },
];

export const storyActions = [
  {
    icon: <MailIcon />,
    tooltip: 'Mail',
    onClick: rowData => {
      // eslint-disable-next-line
      console.log(JSON.stringify(rowData));
    },
  },
  {
    icon: <SearchIcon />,
    tooltip: 'Search item',
    onClick: rowData => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(rowData));
    },
  },
  {
    icon: <EditIcon />,
    tooltip: 'Edit item',
    onClick: rowData => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(rowData));
    },
  },
  {
    icon: <DeleteIcon />,
    tooltip: 'Delete item',
    onClick: (rowData, event) => {
      // eslint-disable-next-line no-console
      console.log(event);
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(rowData));
    },
    visible: rowData => rowData.brand === 'BMW',
  },
];

export const countryColumns = [
  {
    title: 'Country',
    field: 'name',
  },
  {
    title: 'Continent',
    field: 'continent.name',
  },
  {
    title: 'Languages',
    field: 'languages',
    customRender: row => row.languages.map(l => l.name).join(', '),
  },
];

export const countryOptions = {
  title: 'Advanced Filters Example',
  advancedFilters: {
    filtersGroup: [
      {
        name: 'region',
        label: 'Region',
      },
    ],
    filters: [
      {
        label: 'Country',
        type: 'input',
        name: 'country',
        group: 'region',
      },
      {
        label: 'Continent',
        type: 'multi-select',
        name: 'continent',
        group: 'region',
        options: [
          {
            label: 'Asia',
            value: 'Asia',
          },
          {
            label: 'Europe',
            value: 'Europe',
          },
          {
            label: 'South America',
            value: 'South America',
          },
        ],
      },
    ],
  },
};

export const fetchData = props => async ({ page, rowsPerPage, ...filters }) => {
  const {
    advancedFilters: { continent },
  } = filters;

  let {
    advancedFilters: { country },
  } = filters;

  if (country) {
    country = country.toLowerCase();
  }

  const results = props.filter(item => {
    const countryName = item.name.toLowerCase();

    if (country && !countryName.includes(country)) {
      return false;
    }

    return !(
      continent &&
      continent.length &&
      !continent.some(land => land === item.continent.name)
    );
  });

  return {
    data: results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    totalCount: results.length,
  };
};

export const customColumns = [
  {
    title: 'Brand',
    field: 'brand',
  },
  {
    title: 'Model',
    field: 'model.name',
  },
  {
    title: 'Year',
    field: 'model.year',
    options: {
      numeric: true,
    },
    customRender: row => {
      const style = { padding: 5 };

      return (
        <div
          style={
            row.model.year < 2016
              ? { backgroundColor: '#f44336', color: 'white', ...style }
              : style
          }
        >
          {row.model.year}
        </div>
      );
    },
  },
];

export const exporterColumns = [
  {
    title: 'Brand',
    field: 'brand',
  },
  {
    title: 'Model',
    field: 'model.name',
  },
  {
    title: 'Year',
    field: 'model.year',
    options: {
      export: false,
      numeric: true,
    },
  },
  {
    title: 'Price',
    field: 'price',
    options: {
      visible: false,
    },
    handleExport: ({ price }) =>
      price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  },
];

export const filteredColumns = [
  {
    title: 'Brand',
    field: 'brand',
    options: {
      filter: true,
    },
  },
  {
    title: 'Model',
    field: 'model.name',
    options: {
      filter: true,
      select: true,
    },
  },
  {
    title: 'Year',
    field: 'model.year',
    options: {
      filter: true,
    },
  },
];

const carsList = [];

for (let index = 0; index < 70; index++) {
  carsList.push({
    id: index,
    brand: 'BMW',
    model: {
      name: `BMW ${index + 1}`,
      year: 2018,
    },
    price: 3 * (index + 10),
  });
}

export const serverColumns = [
  {
    title: 'Country',
    field: 'name',
    options: {
      filter: true,
      sort: true,
      defaultSort: 'DESC',
    },
  },
  {
    title: 'Code',
    field: 'code',
    options: {
      filter: true,
    },
  },
  {
    title: 'Continent',
    field: 'continent.name',
    options: {
      filter: true,
    },
  },
];

export const sortColumns = [
  {
    title: 'Brand',
    field: 'brand',
  },
  {
    title: 'Model',
    field: 'model.name',
    options: {
      filter: true,
      sort: true,
      defaultSort: 'DESC',
    },
  },
  {
    title: 'Year',
    field: 'model.year',
    options: {
      numeric: true,
      sort: true,
    },
  },
];
