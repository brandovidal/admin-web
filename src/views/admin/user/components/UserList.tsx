// common
import Table from '@common/Table'

// interfaces
import type { TableProps } from '@/interfaces/Table'

// styles
import { Flex, Text, useColorModeValue } from '@chakra-ui/react'

const UserListView = ({
  columnsData,
  tableData,
  totalRows = 0,
  isLoading = false,
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

export default UserListView
