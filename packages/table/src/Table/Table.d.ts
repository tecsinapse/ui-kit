import { ReactNode, FC } from 'react';

export type ColumnsType = {
  title: string;
  field: string;
  options?: {
    filter?: boolean;
    sort?: boolean;
    defaultSort?: 'ASC' | 'DESC';
    numeric?: boolean;
    hiddenCard?: boolean;
  };
  customRender?: (row: object) => void;
};

export type ActionsType = {
  tooltip: string;
  icon: ReactNode;
  onClick: (data: object) => void;
  visible?: (data: object) => boolean;
  labelColor?: string;
  label?: string;
  bottomDivider?: boolean;
};

export type ToolbarActionsTypes = {
  key: string;
  label?: string;
  tooltip?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onClick: Function;
};

export type ToolbarFiltersOptionsTypes = {
  value?: any;
  label?: string;
  disabled?: boolean;
};

export type ToolbarFiltersTypes = {
  group?: string;
  type: 'input' | 'select' | 'multi-select' | 'date' | 'time' | 'checkbox';
  name: string;
  label: string;
  options?: Array<ToolbarFiltersOptionsTypes>;
  value?: any;
};

export type ToolbarFiltersGroupTypes = {
  name: string;
  label?: string;
};

export type ToolbarTypes = {
  title?: ReactNode;
  selectedLabel?: Function;
  actions?: Array<ToolbarActionsTypes>;
  advancedFilters?: {
    applyFilters?: Function;
    filtersGroup?: Array<ToolbarFiltersGroupTypes>;
    filters?: Array<ToolbarFiltersTypes>;
    maxWidth?: string | number;
    maxHeight?: string | number;
  };
};

export type ExportOptionsTypes = {
  type: 'csv' | 'custom';
  label: string;
  delimeter?: string;
  exportFunc?: Function;
};

export interface TableProps {
  /** Table columns options. Please note `defaultSort` option initializes a single column sorted in the order provided. Do not use more then one defaultSort field at a time. */
  columns: Array<ColumnsType>;
  /** Data object or function loader */
  data: Array<object> | Function;
  /** On data filter funtion handler */
  onFilterData?: (data: object) => void;
  /** Set vertical actions legacy */
  verticalActions?: boolean;
  /** Row identifier */
  rowId: (row: object) => string | number;
  /** Set legacy selectable rows */
  options?: {
    selection: boolean;
  };
  /** Object containing selected rows */
  selectedData?: Array<object>;
  /** Row selection handler */
  onSelectRow?: (
    selectedRows: Array<object>,
    rowData: object,
    checked: boolean
  ) => void;
  /** Row click handler */
  onRowClick?: (data: object) => void;
  id?: string;
  /** Configure legacy actions */
  actions?: Array<ActionsType>;
  /** Table toolbar options. Check accepted attributes [here](https://github.com/tecsinapse/table/blob/master/src/Table/TablePropTypes.js#L3) */
  toolbarOptions?: ToolbarTypes;
  /** Enable legacy pagination */
  pagination?: boolean;
  /** Hide legacy toolbar */
  tableToolbarHide?: boolean;
  /** Hide legacy header */
  tableHeaderHide?: boolean;
  /** Number of rows per page available to be selected */
  rowsPerPageOptions?: Array<number>;
  /** Rows to be rendered per page if paginated */
  rowsPerPage?: number;
  /** Current page number */
  page?: number;
  /** CSS classes applied to root div */
  classes?: {
    root?: string;
    rootMobile?: string;
  };
  /** Set options for exporting legacy. If custom `type` is provided, you have to set `exportFunc` and `label` */
  exportOptions?: {
    exportFileName?: string;
    position?: 'header' | 'footer';
    exportTypes: Array<ExportOptionsTypes>;
  };
  /** Set legacy variant view */
  variant?: 'auto' | 'web' | 'mobile';
  /** Label for mobile show less button */
  labelShowLess?: string;
  /** Label for mobile show more button */
  labelShowMore?: string;
  /** Empty state component to display */
  empytStateComponent?: ReactNode;
  /** Hide floating label of select filter */
  hideSelectFilterLabel?: boolean;
  /** Replace legacy advanced filters to your own. `cleanFilters` is associated to close button on custom Advanced Filters */
  customAdvancedFilters?: {
    applyFilters: Function;
    filters: ReactNode;
    cleanFilters: Function;
    cleanFiltersLabel: string;
  };
  /** Provides custom row render. See examples for more detailed use cases. */
  customRow?: (params: object) => void;
  /** Callback when closing advanced filters. */
  onDrawerClose?: Function;
}

declare const Table: FC<TableProps>;

export default Table;
