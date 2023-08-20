import type { ColumnData, PageSizeFilterProps, PaginationProps } from '../libs/ReactTable'

export interface TableProps extends PaginationProps, PageSizeFilterProps {
  columnsData: ColumnData
  tableData: object[] | []
  manualPagination?: boolean
  emptyDataMessage?: string
}
