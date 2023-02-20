import { Column, HeaderGroup, Row } from "react-table";

export const columnsDataCheck = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
];
export const columnsDataComplex = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
];

export type ColumnData = Column[];

export type TableData = Column<{
  name: (string | boolean)[];
  date: string;
  progress: number;
  quantity?: number;
  status?: string;
  artworks?: string;
  rating?: number;
}>;

export type PageSizeFilterProps = {
  pageSize: number;
  pageSizes?: number[];
  setPageSize: Function;
};

export type GlobalFilterProps = {
  globalFilter: string;
  setGlobalFilter: Function;
  placeholder?: string;
};

export type ReactTableProps = {
  getTableProps: Function;
  getTableBodyProps: Function;
  headerGroups: HeaderGroup[];
  prepareRow: Function;
  rows: Row[];

  isLoading?: boolean;
  emptyDataMessage?: string;
};

export type PaginationProps = {
  currentPage: number;
  pageChangeHandler: Function;
  totalRows: number;
  rowsPerPage: number;
  isLoading?: boolean;
};

export interface TableProps {
  columnsData: ColumnData;
  tableData: TableData[];
  manualPagination?: boolean;
  emptyDataMessage?: string;

  isLoading?: boolean;
  totalRows: number;
  rowsPerPage: number;

  currentPage: number;
  pageChangeHandler: Function;

  pageSize: number;
  pageSizeChangeHandler: Function;
}
