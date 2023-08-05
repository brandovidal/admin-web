import type { Column, HeaderGroup, Row } from 'react-table'
import type { PaginationType } from './Response'

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
  pageSize?: number
  pageSizes?: number[]
  pageSizeHandler: (value: number) => void
}

export interface GlobalFilterProps {
  globalFilter: string
  setGlobalFilter: (value?: string | number | object) => void
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
  pagination?: PaginationType
  isLoading?: boolean
  pageChangeHandler: (value: number) => void
}

export interface TableProps extends PaginationProps, PageSizeFilterProps {
  columnsData: ColumnData
  tableData: any[]
  manualPagination?: boolean
  emptyDataMessage?: string
}
