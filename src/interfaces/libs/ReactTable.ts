import type { HeaderGroup, Row, TablePropGetter, TableBodyPropGetter, TableProps, TableBodyProps, Column } from 'react-table'
import type { PaginationType } from '../common/Response'

export type ColumnData = Column[]

export interface ReactTableProps {
  getTableProps: (propGetter?: TablePropGetter<object> | undefined) => TableProps
  getTableBodyProps: (propGetter?: TableBodyPropGetter<object> | undefined) => TableBodyProps
  headerGroups: HeaderGroup[]
  prepareRow: (row: Row<object>) => void
  rows: Row[]

  isLoading?: boolean
  emptyDataMessage?: string
}
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

export interface PaginationProps {
  pagination?: PaginationType
  isLoading?: boolean
  pageChangeHandler: (value: number) => void
}
