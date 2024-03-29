import { ReactNode } from 'react';

export type ColumnsType<T> = {
  title: string;
  field: keyof T | string;
  options?: {
    select?: boolean;
    filter?: boolean;
    sort?: boolean;
    defaultSort?: 'ASC' | 'DESC';
    numeric?: boolean;
    hiddenCard?: boolean;
    /** Option to include or exclude field from CSV export */
    export?: boolean;
  };
  customRender?: (row: T) => ReactNode | JSX.Element;
  /** This function must return a string, since is reserved for CSV exporter */
  handleExport?: (row: T) => string;
};

export type ActionsType<T> = {
  tooltip: string;
  icon: ReactNode;
  onClick: (data: T) => void;
  visible?: (data: T) => boolean;
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
  options?: ToolbarFiltersOptionsTypes[];
  value?: any;
};

export type ToolbarFiltersGroupTypes = {
  name: string;
  label?: string;
};

export type ToolbarTypes = {
  title?: ReactNode;
  selectedLabel?: Function;
  actions?: ToolbarActionsTypes[];
  advancedFilters?: {
    applyFilters?: Function;
    filtersGroup?: ToolbarFiltersGroupTypes[];
    filters?: ToolbarFiltersTypes[];
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

export type ServerSideTable<T> = {
  data: T[];
  totalCount: number;
};

export type OnSelectRowProp<T> = (
  selectedRows: T[],
  rowData: T,
  checked: boolean
) => void;

export type RowIdProp<T> = (row: T) => string | number;

export type OnRowClickProp<T> = (row: T) => void;

export type CustomRowProps<T> = {
  rowData: T;
  rowId: RowIdProp<T>;
  columns: ColumnsType<T>;
  selectedRows?: T[];
  onSelectRow?: OnSelectRowProp<T>;
  setSelectedRows?: (rowData: T[]) => void;
  onRowClick?: OnRowClickProp<T>;
  forceCollapseActions?: boolean;
  verticalActions?: boolean;
};

export type ServerSideFilters<T> = {
  advancedFilters?: any; // TODO: Add mapping
  ascending?: boolean;
  headerFilters?:
    | { [K in keyof T]: { value: string; matchType: 'INCLUDE' | 'EXACT' } }
    | any; // TODO: Check mapping
  loadedResolver?: () => void | null;
  page?: number;
  rowsPerPage?: number;
  sortField?: string;
  sortFunc?: (data: T[], field: string, ascending: boolean) => T[];
  startIndex?: number;
  stopIndex?: number;
};

export interface TableProps<T> {
  /** Table columns options. Please note `defaultSort` option initializes a single column sorted in the order provided. Do not use more then one defaultSort field at a time. */
  columns: ColumnsType<T>[];
  /** Data object or function loader */
  data:
    | T[]
    | ((filters: ServerSideFilters<T>) => ServerSideTable<T>)
    | ((filters: ServerSideFilters<T>) => Promise<ServerSideTable<T>>);
  /** On data filter funtion handler */
  onFilterData?: (data: T) => void;
  /** Set vertical actions legacy */
  verticalActions?: boolean;
  /** Row identifier */
  rowId: RowIdProp<T>;
  /** Set legacy selectable rows */
  options?: {
    selection: boolean;
  };
  /** Object containing selected rows */
  selectedData?: T[];
  /** Row selection handler */
  onSelectRow?: OnSelectRowProp<T>;
  /** Row click handler */
  onRowClick?: OnRowClickProp<T>;
  id?: string;
  /** Configure legacy actions */
  actions?: ActionsType<T>[];
  /** Table toolbar options. Check accepted attributes [here](https://github.com/tecsinapse/table/blob/master/src/Table/TablePropTypes.js#L3) */
  toolbarOptions?: ToolbarTypes;
  /** Enable legacy pagination */
  pagination?: boolean;
  /** Hide legacy toolbar */
  tableToolbarHide?: boolean;
  /** Hide legacy header */
  tableHeaderHide?: boolean;
  /** Number of rows per page available to be selected */
  rowsPerPageOptions?: number[];
  /** Rows to be rendered per page if paginated */
  rowsPerPage?: number;
  /** Current page number */
  page?: number;
  /** Current page handler */
  setPage?: (page: number) => void;
  /** CSS classes applied to root div */
  classes?: {
    root?: string;
    rootMobile?: string;
  };
  /** Set options for exporting legacy. If custom `type` is provided, you have to set `exportFunc` and `label` */
  exportOptions?: {
    exportFileName?: string;
    position?: 'header' | 'footer';
    footerSpan?: number;
    exportTypes: ExportOptionsTypes[];
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
    applyFilters: () => void;
    filters: ReactNode;
    toolbarButton?: (handleOpenFilters: () => void) => ReactNode;
    cleanFilters: () => void;
    cleanFiltersLabel: string;
    maxWidth?: string | number;
    maxHeight?: string | number;
  };
  /** Provides custom row render. See examples for more detailed use cases. */
  customRow?: (props: CustomRowProps) => ReactNode | JSX.Element;
  /** Callback when closing advanced filters. */
  onDrawerClose?: () => void;
  /** Override custom list render when opening actions drawer on mobile */
  customActionsMobile?: (data: T[]) => ReactNode;
  /** Apply debounce time to headers filters. Helpful when dealing with server side */
  headerFiltersDebounceTime?: number;
}

declare const Table: <T>(props: TableProps<T>) => JSX.Element;

export default Table;
