import { type Column, type HeaderGroup, type Row } from 'react-table'

export const columnsDataCheck = [
  {
    Header: 'NAME',
    accessor: 'name'
  },
  {
    Header: 'PROGRESS',
    accessor: 'progress'
  },
  {
    Header: 'QUANTITY',
    accessor: 'quantity'
  },
  {
    Header: 'DATE',
    accessor: 'date'
  }
]
export const columnsDataComplex = [
  {
    Header: 'NAME',
    accessor: 'name'
  },
  {
    Header: 'STATUS',
    accessor: 'status'
  },
  {
    Header: 'DATE',
    accessor: 'date'
  },
  {
    Header: 'PROGRESS',
    accessor: 'progress'
  }
]

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
  limit: number
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
  page: number
  pageChangeHandler: any
  total: number
  rowsPerPage: number
  isLoading?: boolean
}

export interface TableProps {
  columnsData: ColumnData
  tableData: any[]
  manualPagination?: boolean
  emptyDataMessage?: string

  isLoading?: boolean
  total?: number
  rowsPerPage?: number

  page?: number
  pageChangeHandler?: any

  limit?: number
  limitChangeHandler?: any
}
