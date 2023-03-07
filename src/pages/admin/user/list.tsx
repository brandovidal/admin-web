import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'

// Components
import Card from '@/components/card/Card'

// Layout
import AdminLayout from '@/layouts/admin'

// Interfaces

// Variables
import { formatData } from '@/views/admin/customTables/variables/data'
import { columns } from '@/views/admin/customTables/variables/columnsData'

// Views
import UserListView from '@/views/admin/user/components/UserList'

// Services
import { useGetUsers } from '@/services/user'

// styles
import { Box, SimpleGrid } from '@chakra-ui/react'

export default function UserList (): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const router = useRouter()

  const { loading, response } = useGetUsers(currentPage, pageSize)

  const users = useMemo(() => formatData(response?.data?.users ?? [], router), [response?.data?.users, router])
  const total = useMemo(() => response?.data?.total ?? 0, [response?.data?.total])
  const isLaoding = useMemo(() => loading ?? false, [loading])

  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
          <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            <UserListView
              columnsData={columns}
              tableData={users}
              isLoading={isLaoding}
              totalRows={total}
              currentPage={currentPage}
              pageChangeHandler={setCurrentPage}
              pageSize={pageSize}
              pageSizeChangeHandler={setPageSize}
              rowsPerPage={10}
            />
          </Card>
        </SimpleGrid>
      </Box>
    </AdminLayout>
  )
}
