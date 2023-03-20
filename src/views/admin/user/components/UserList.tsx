// common
import Table from '@common/Table'

// interfaces
import type { UserViewProps } from '@/interfaces/User'

// styles
import { Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { MdAdd } from 'react-icons/md'

const UserListView = ({
  router,
  columnsData,
  tableData,
  total = 0,
  isLoading = false,
  manualPagination = false,
  rowsPerPage,
  page = 1,
  pageChangeHandler,
  limit = 10,
  limitChangeHandler
}: UserViewProps): JSX.Element => {
  const textColor = useColorModeValue('secondaryGray.900', 'white')

  const handleAddUser = (): void => {
    void router.push('/admin/user/add')
  }

  return (
    <div>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
          Users <small>({isLoading ? 'Loading...' : `${total} registros`})</small>
        </Text>

        <Button variant='brand' onClick={handleAddUser} disabled={!isLoading}>
          <Icon as={MdAdd} h='16px' w='16px' me='8px' />
          Agregar
        </Button>
      </Flex>
      <Table
        columnsData={columnsData}
        tableData={tableData}
        isLoading={isLoading}
        total={total}
        page={page}
        manualPagination={manualPagination}
        rowsPerPage={rowsPerPage}
        pageChangeHandler={pageChangeHandler}
        limit={limit}
        limitChangeHandler={limitChangeHandler}
        emptyDataMessage='No hay datos disponibles'
      />
    </div>
  )
}

export default UserListView
