// libs
import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'

// Components
import Card from '@/components/card/Card'

// Layout
import AdminLayout from '@/layouts/admin'

// Interfaces

// Variables
import { formatData } from '@/views/admin/user/variables/data'
import { columns } from '@/views/admin/user/variables/columnsData'

// Views
import UserListView from '@/views/admin/user/components/UserList'

// Services
import { useGetUsers } from '@/services/user'

// styles
import { Box, SimpleGrid } from '@chakra-ui/react'

export default function UserList (): JSX.Element {
  const router = useRouter()

  const [page, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, isLoading } = useGetUsers({ page, limit })

  const users = useMemo(() => formatData(data?.data ?? [], router), [data, router])
  const total = useMemo(() => data?.total ?? 0, [data?.total])

  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
          <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            <UserListView
              router={router}
              columnsData={columns}
              tableData={users}
              isLoading={isLoading}
              total={total}
              page={page}
              pageChangeHandler={setCurrentPage}
              limit={limit}
              limitChangeHandler={setLimit}
              rowsPerPage={10}
            />
          </Card>
        </SimpleGrid>
      </Box>
    </AdminLayout>
  )
}
