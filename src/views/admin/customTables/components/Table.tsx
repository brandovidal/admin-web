import { Flex, Text, useColorModeValue } from '@chakra-ui/react'

import Table from '@/common/Table'

import { type TableProps } from '@/views/admin/default/variables/columnsData'

const CustomTable = ({
  columnsData,
  tableData,
  totalRows,
  isLoading,
  manualPagination = false,
  rowsPerPage,
  currentPage,
  pageChangeHandler,
  pageSize,
  pageSizeChangeHandler
}: TableProps): JSX.Element => {
  const textColor = useColorModeValue('secondaryGray.900', 'white')

  return (
    <div>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
          Custom Table <small>({((`${totalRows ?? 0} registros`) !== null) || 'Loading...'})</small>
        </Text>
      </Flex>
      <Table
        columnsData={columnsData}
        tableData={tableData}
        isLoading={isLoading}
        totalRows={totalRows}
        currentPage={currentPage}
        manualPagination={manualPagination}
        rowsPerPage={rowsPerPage}
        pageChangeHandler={pageChangeHandler}
        pageSize={pageSize}
        pageSizeChangeHandler={pageSizeChangeHandler}
        emptyDataMessage='No hay datos disponibles'
      />
    </div>
  )
}

export default CustomTable
