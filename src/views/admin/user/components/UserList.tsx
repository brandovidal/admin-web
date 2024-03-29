// common
import Table from '@common/Table/default'

// interfaces
import type { ViewListProps } from '@/interfaces/views/default'

// styles
import { Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { MdAdd, MdUpdate } from 'react-icons/md'

// utils
import { generateRecord } from '@/utils/page'

const UserListView = ({
  handleAdd,
  handleRefresh,
  columnsData,
  tableData,
  manualPagination = false,
  isLoading = false,
  pagination,
  pageChangeHandler,
  pageSizeHandler
}: ViewListProps): JSX.Element => {
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const record = generateRecord(isLoading, pagination?.total ?? 0)

  return (
    <>
      <Flex flexDirection={['column', 'column', 'row', 'row']} justify='space-between' align={['flex-start', 'flex-start', 'center', 'center']}
        px={4} gap={4} mb={4}>
        <Flex flexDirection={['column', 'column', 'column', 'row']} columnGap={2}>
          <Text color={textColor} fontSize='xl' fontWeight='700' lineHeight='100%'>
            User List
          </Text>
          <Text fontSize='sm' fontWeight='500'>({record})</Text>
        </Flex>

        <Flex w={['full', 'full', 'auto', 'auto']} gap={4} justify='flex-end'>
          <Button variant='outline' onClick={handleRefresh} disabled={!isLoading}>
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
        manualPagination={manualPagination}
        emptyDataMessage='No hay datos disponibles'
        isLoading={isLoading}
        pagination={pagination}
        pageChangeHandler={pageChangeHandler}
        pageSizeHandler={pageSizeHandler}
      />
    </>
  )
}

export default UserListView
