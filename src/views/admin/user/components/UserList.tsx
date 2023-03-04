import { Flex, Text, useColorModeValue } from '@chakra-ui/react'

// common
import Table from '@common/Table'

// Components
import MenuActions from '@/components/menu/Actions'

// interfaces
import type { TableProps } from '@/interfaces/Table'

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
          <MenuActions title='acciones' actions={[]}></MenuActions>
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
