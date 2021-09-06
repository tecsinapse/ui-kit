import * as React from 'react';
import { Title, Description, ArgsTable } from '@storybook/addon-docs/blocks';
import { Input, IconButton, Button, DivFlex } from '@tecsinapse/ui-kit';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import Icon from '@mdi/react';
import {
  Paper,
  FormControlLabel,
  Typography,
  Switch,
  TableRow,
  TableCell,
  Collapse,
} from '@material-ui/core';
import { Table, Cells, resolveData, handleRowClick } from 'Table';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import { cars, countries } from './exampleData';
import {
  columnsSimple,
  columnsAction,
  storyActions,
  countryColumns,
  countryOptions,
  fetchData,
  customColumns,
  exporterColumns,
  filteredColumns,
  serverColumns,
  sortColumns,
  useCustomRowStyles,
} from './storyHelper';
import FilterIcon from '@material-ui/icons/FilterList';
import { resolveObj } from '@tecsinapse/es-utils';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

export default {
  title: `Packages @tecsinapse/table`,
  component: Table,
  decorators: [
    Story => {
      const style = { width: 1000 };

      return (
        <DivFlex>
          <Paper style={style}>
            <Story />
          </Paper>
        </DivFlex>
      );
    },
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            The Table component can receive the following props:
          </Description>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Base = args => (
  <Table
    {...args}
    columns={columnsSimple}
    data={cars}
    rowId={row => row.id}
    onRowClick={action('onRowClick')}
  />
);

export const WithActions = args => (
  <Table
    {...args}
    columns={columnsAction}
    data={cars}
    rowId={row => row.id}
    actions={storyActions}
    onRowClick={action('onRowClick')}
  />
);

export const WithVerticalActions = args => (
  <Table
    {...args}
    columns={columnsAction}
    data={cars}
    verticalActions
    rowId={row => row.id}
    actions={[
      {
        label: 'Mail',
        onClick: action('onClick'),
        bottomDivider: true,
      },
      {
        labelColor: '#e6433f',
        label: 'Search item',
        onClick: action('onClick'),
      },
    ]}
  />
);

export const WithAdvancedFilters = args => {
  const [page, setPage] = useState(0);

  return (
    <Table
      {...args}
      columns={countryColumns}
      data={fetchData(countries)}
      rowId={row => row.code}
      toolbarOptions={countryOptions}
      rowsPerPageOptions={[1, 2, 5, 10, 20, 30]}
      page={page}
      setPage={setPage}
    />
  );
};

WithAdvancedFilters.args = {
  pagination: true,
};

export const WithAdvancedCustomFilters = args => {
  const [page, setPage] = useState(0);

  return (
    <Table
      {...args}
      page={page}
      setPage={setPage}
      columns={countryColumns}
      data={fetchData(countries)}
      rowId={row => row.code}
      toolbarOptions={countryOptions}
      onDrawerClose={action('onDrawerClose')}
      customAdvancedFilters={{
        applyFilters: action('applyFilters'),
        cleanFilters: action('cleanFilters'),
        cleanFiltersLabel: 'Limpar Filtros',
        toolbarButton: handleClick => (
          <Button
            onClick={handleClick}
            startIcon={<FilterIcon />}
            customVariant="default"
            style={{ whiteSpace: 'nowrap' }}
            size="small"
          >
            Filtros Avançados
          </Button>
        ),
        filters: (
          <div style={{ padding: '20px 16px 20px 16px' }}>
            <Typography variant="subtitle2">Continent</Typography>
            <Input
              name="continent"
              placeholder="Continent"
              fullWidth
              variantDevice="web"
              disabled
            />
            <Typography variant="subtitle2" style={{ marginTop: '16px' }}>
              Languages
            </Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                marginTop: '8px',
              }}
            >
              <FormControlLabel
                control={<Switch size="small" />}
                label="ca"
                checked
                disabled
              />
              <FormControlLabel
                control={<Switch size="small" />}
                label="ar"
                checked
                disabled
              />
              <FormControlLabel
                control={<Switch size="small" />}
                label="ps/uz/tk"
                checked
                disabled
              />
              <FormControlLabel
                control={<Switch size="small" />}
                label="pt"
                checked
                disabled
              />
            </div>
          </div>
        ),
      }}
    />
  );
};

WithAdvancedCustomFilters.args = {
  pagination: true,
};

export const WithCustomHeader = args => {
  const style = { display: 'flex' };
  const style1 = { marginRight: '20px' };

  return (
    <Table
      {...args}
      columns={customColumns}
      data={cars}
      rowId={row => row.id}
      toolbarOptions={{
        title: (
          <div style={style}>
            <Typography variant="h6" style={style1}>
              Custom header
            </Typography>
            <FormControlLabel
              control={<Switch size="small" />}
              label="On/Off"
            />
          </div>
        ),
      }}
    />
  );
};

export const WithCustomRow = args => {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useCustomRowStyles();

  return (
    <Table
      {...args}
      columns={customColumns}
      data={cars}
      rowId={row => row.id}
      customRow={({ rowData }) => {
        const style5 = { borderLeft: rowData.id === 2 ? '3px red solid' : '' };

        return (
          <React.Fragment key={rowData.id}>
            <TableRow
              key={rowData.id}
              hover
              style={style5}
              className={rowData.id === 2 ? classes.root : ''}
            >
              {customColumns.map(item => {
                return (
                  <TableCell
                    key={item.field}
                    align={
                      item.options && item.options.numeric ? 'right' : 'left'
                    }
                  >
                    {resolveData(item.field, rowData)}
                  </TableCell>
                );
              })}
            </TableRow>
            {rowData.id === 2 && (
              <TableRow className={classes.style}>
                <TableCell
                  colSpan={customColumns.length}
                  className={classes.style1}
                >
                  <div className={classes.style2}>
                    <Typography variant="caption">Expand</Typography>
                    <IconButton
                      size="small"
                      onClick={() => setExpanded(!expanded)}
                    >
                      <Icon
                        path={expanded ? mdiChevronUp : mdiChevronDown}
                        size={0.75}
                      />
                    </IconButton>
                  </div>
                  <Collapse in={expanded}>
                    <div className={classes.style3}>
                      <Typography variant="subtitle2">
                        Custom container title
                      </Typography>
                      <Typography variant="caption">
                        Custom description
                      </Typography>
                      <Typography variant="caption" className={classes.style4}>
                        This is OK
                      </Typography>
                    </div>
                  </Collapse>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        );
      }}
    />
  );
};

export const WithReusableRow = args => (
  <Table
    {...args}
    columns={customColumns}
    data={cars}
    rowId={row => row.id}
    options={{
      selection: true,
    }}
    actions={storyActions}
    toolbarOptions={{ title: 'Custom reusable row' }}
    customRow={({
      rowData,
      rowId,
      columns,
      selectedRows,
      onSelectRow,
      setSelectedRows,
      onRowClick,
      forceCollapseActions,
      verticalActions,
    }) => {
      const hasSelection = (columns || []).some(({ selection }) => selection);
      return (
        <TableRow
          key={rowId(rowData)}
          hover
          onClick={handleRowClick(
            rowData,
            hasSelection,
            onSelectRow,
            onRowClick,
            selectedRows,
            setSelectedRows,
            rowId
          )}
        >
          <Cells
            columns={columns}
            rowData={rowData}
            selectedRows={selectedRows}
            onSelectRow={onSelectRow}
            rowId={rowId}
            forceCollapseActions={forceCollapseActions}
            verticalActions={verticalActions}
          />
        </TableRow>
      );
    }}
  />
);

export const WithHeaderExport = args => {
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
  const [page, setPage] = useState(0);

  return (
    <Table
      {...args}
      page={page}
      setPage={setPage}
      columns={exporterColumns}
      data={carsList}
      rowId={row => row.id}
      options={{
        selection: true,
      }}
      toolbarOptions={{ title: 'Exporter Example' }}
      pagination
      exportOptions={{
        exportTypes: [
          {
            type: 'csv',
          },
          {
            type: 'custom',
            label: 'Export to Custom',
            exportFunc: action('exportFunc'),
          },
        ],
      }}
    />
  );
};

export const WithFooterExport = args => {
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
  const [page, setPage] = useState(0);

  return (
    <Table
      {...args}
      page={page}
      setPage={setPage}
      columns={exporterColumns}
      data={carsList}
      rowId={row => row.id}
      options={{
        selection: true,
      }}
      toolbarOptions={{ title: 'Exporter Example' }}
      pagination
      exportOptions={{
        position: 'footer',
        exportTypes: [
          {
            type: 'custom',
            label: 'Export to Custom',
            exportFunc: action('exportFunc'),
          },
        ],
      }}
    />
  );
};

export const WithFilters = args => (
  <Table
    {...args}
    columns={filteredColumns}
    data={cars}
    rowId={row => row.id}
    toolbarOptions={{ title: 'Filtering Example' }}
    onFilterData={action('onFilterData')}
  />
);

export const WithSelection = args => (
  <Table
    {...args}
    columns={columnsAction}
    data={cars}
    rowId={row => row.id}
    options={{
      selection: true,
    }}
    onSelectRow={action('onSelectRow')}
    toolbarOptions={{
      title: 'List of Cars',
      actions: [
        {
          key: 'no-icon',
          label: 'No Icon Button',
          onClick: action('onClick'),
        },
        {
          key: 'send',
          label: 'Send',
          iconRight: <SendIcon />,
          tooltip: 'Send rows do email',
          onClick: action('onClick'),
        },
        {
          key: 'delete',
          label: 'Delete',
          iconLeft: <DeleteIcon />,
          onClick: action('onClick'),
        },
      ],
    }}
  />
);

export const WithRemoteData = args => {
  const serverData = async ({
    headerFilters,
    page,
    rowsPerPage,
    startIndex,
    stopIndex,
    loadedResolver,
    ascending,
    sortField,
    sortFunc,
  }) => {
    sortFunc(countries, sortField, ascending);
    let filteredData = [...countries];
    Object.keys(headerFilters).forEach(field => {
      const filterValue = headerFilters[field];
      filteredData = filteredData.filter(row => {
        const valueField = resolveObj(field, row);
        if (!filterValue) {
          return true;
        }
        if (typeof valueField === 'object') {
          return true;
        }
        if (typeof valueField === 'string') {
          return valueField
            .toLowerCase()
            .includes(filterValue.value.toLowerCase());
        }
        return false;
      });
    });

    return {
      data: filteredData.slice(
        // It can get the slice by start/stop index or page/rowsPerPage.
        // The first one is for mobile, while the second one is for desktop
        loadedResolver ? startIndex : page * rowsPerPage,
        loadedResolver ? stopIndex : page * rowsPerPage + rowsPerPage
      ),
      totalCount: filteredData.length,
    };
  };
  const [page, setPage] = useState(0);

  return (
    <Table
      {...args}
      page={page}
      setPage={setPage}
      columns={serverColumns}
      data={serverData}
      rowId={row => row.code}
      toolbarOptions={{ title: 'Server Side Example' }}
      exportOptions={{
        exportTypes: [
          {
            type: 'csv',
          },
        ],
      }}
      options={{
        selection: true,
      }}
    />
  );
};

WithRemoteData.args = {
  pagination: true,
};

export const WithSorting = args => {
  const carsList = [];
  for (let index = 0; index < 70; index++) {
    carsList.push({
      id: index,
      brand: 'BMW',
      model: {
        name: `BMW ${index + 1}`,
        year: 2000 + index,
      },
      price: 30000000,
    });
  }
  const [page, setPage] = useState(0);

  return (
    <Table
      {...args}
      page={page}
      setPage={setPage}
      columns={sortColumns}
      data={carsList}
      rowId={row => row.id}
      options={{
        selection: true,
      }}
      toolbarOptions={{ title: 'Sort Example' }}
    />
  );
};

WithSorting.args = {
  pagination: true,
};
