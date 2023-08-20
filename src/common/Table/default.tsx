import { useMemo } from 'react'

import { Flex, Text, useColorModeValue } from '@chakra-ui/react'

import ReactTable from '@/libs/ReactTable/default'
import Pagination from '@/libs/ReactTable/Pagination'
import { PageSizeFilter } from '@/libs/ReactTable/PageSizeFilter'
import { GlobalFilter } from '@/libs/ReactTable/GlobalFilter'

import { useGlobalFilter, useSortBy, useTable } from 'react-table'

import type { TableProps } from '@/interfaces/common/Table'

const Table = ({
  columnsData,
  tableData,
  manualPagination = false,
  emptyDataMessage = 'No hay datos para mostrar',
  isLoading = false,
  pagination,
  pageChangeHandler,
  pageSizeHandler
}: TableProps): JSX.Element => {
  const textColor = useColorModeValue('secondaryGray.900', 'white')

  const columns = useMemo(() => columnsData, [columnsData])
  const data = useMemo(() => tableData, [tableData])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    setGlobalFilter,
    state: { globalFilter }
  } = useTable(
    {
      columns,
      data,
      manualPagination,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useGlobalFilter,
    useSortBy
  )

  return (
    <>
      {isLoading && (
        <Flex justifyContent='center' alignItems='center' py='10'>
          <Text color={textColor}>Loading...</Text>
        </Flex>
      )}
      {!isLoading && (
        <>
          <Flex flexDirection={['column', 'column', 'row', 'row']} justifyContent='space-between' alignItems='center' mx={4} gap={4}>
            <PageSizeFilter pageSize={pagination?.pageSize} pageSizeHandler={pageSizeHandler} />
            <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} placeholder={'Buscar por nombre'} />
          </Flex>
          <>
            <ReactTable
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              prepareRow={prepareRow}
              rows={rows}
              isLoading={isLoading}
              emptyDataMessage={emptyDataMessage}
            />
          </>
          <Pagination isLoading={isLoading} pagination={pagination} pageChangeHandler={pageChangeHandler} />
        </>
      )}
    </>
  )
}

export default Table
