// common
import Table from '@common/Table'

// interfaces
import type { UserViewProps } from '@/interfaces/User'

// styles
import { Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { MdAdd, MdUpdate } from 'react-icons/md'

// utils
import { generateRecord } from '@/utils/page'

const UserListView = ({
  handleAdd,
  handleRefetch,
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
  const record = generateRecord(isLoading, total)

  return (
    <>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text color={textColor} fontSize='xl' fontWeight='700' lineHeight='100%'>
          User List <small>({record})</small>
        </Text>

        <Flex gap={4}>
          <Button variant='outline' onClick={handleRefetch} disabled={!isLoading}>
            <Icon as={MdUpdate} h='16px' w='16px' me='8px' />
            Refresh
          </Button>
          <Button variant='brand' onClick={handleAdd} disabled={!isLoading}>
            <Icon as={MdAdd} h='16px' w='16px' me='8px' />
            Add
          </Button>
        </Flex>
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
    </>
  )
}

export default UserListView
