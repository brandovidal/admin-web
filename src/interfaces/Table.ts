import { type Column, type HeaderGroup, type Row } from 'react-table'

export type ColumnData = Column[]

export type TableData = Column<{
  name: Array<string | boolean>
  date: string
  progress: number
  quantity?: number
  status?: string
  artworks?: string
  rating?: number
}>

export interface PageSizeFilterProps {
  pageSize: number
  pageSizes?: number[]
  setPageSize: any
}

export interface GlobalFilterProps {
  globalFilter: string
  setGlobalFilter: any
  placeholder?: string
}

export interface ReactTableProps {
  getTableProps: any
  getTableBodyProps: any
  headerGroups: HeaderGroup[]
  prepareRow: any
  rows: Row[]

  isLoading?: boolean
  emptyDataMessage?: string
}

export interface PaginationProps {
  currentPage: number
  pageChangeHandler: any
  totalRows: number
  rowsPerPage: number
  isLoading?: boolean
}

export interface TableProps {
  columnsData: ColumnData
  tableData: any[]
  manualPagination?: boolean
  emptyDataMessage?: string

  isLoading?: boolean
  totalRows?: number
  rowsPerPage?: number

  currentPage?: number
  pageChangeHandler?: any

  pageSize?: number
  pageSizeChangeHandler?: any
}

export interface PageData {
  data: any[]
  isLoading: boolean
  totalPages: number
  totalRows: number
}
