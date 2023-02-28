import { Flex, Text, useColorModeValue } from '@chakra-ui/react'

import Table from '@/common/Table'

import { type TableProps } from '@/views/admin/default/variables/columnsData'

const CustomTable = ({
  columnsData,
  tableData,
  totalRows = 0,
  isLoading = false,
  manualPagination = false,
  rowsPerPage = 0,
  currentPage = 10,
  pageChangeHandler,
  pageSize,
  pageSizeChangeHandler
}: TableProps): JSX.Element => {
  const textColor = useColorModeValue('secondaryGray.900', 'white')

  return (
    <div>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
          Users <small>({isLoading ? 'Loading...' : `${totalRows} registros`})</small>
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
