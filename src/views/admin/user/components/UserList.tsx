// common
import Table from '@common/Table'

// interfaces
import type { UserViewProps } from '@/interfaces/User'

// styles
import { Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { MdAdd, MdOutlineRestartAlt } from 'react-icons/md'

const UserListView = ({
  router,
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
}: UserViewProps): JSX.Element => {
  const textColor = useColorModeValue('secondaryGray.900', 'white')

  const handleAddUser = (): void => {
    void router.push('/admin/user/add')
  }

  return (
    <div>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
          Users <small>({isLoading ? 'Loading...' : `${totalRows} registros`})</small>
        </Text>

        <Button variant='brand' onClick={handleAddUser} disabled={!isLoading}>
          <Icon as={MdAdd} h='16px' w='16px' me='8px' />
          Agregar
        </Button>

        <Button variant='brand' onClick={handleAddUser} disabled={!isLoading}>
          <Icon as={MdOutlineRestartAlt} h='16px' w='16px' me='8px' />
          Actualizar
        </Button>
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
