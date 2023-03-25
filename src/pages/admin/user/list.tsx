// libs
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import isEmpty from 'just-is-empty'

// Components
import Card from '@/components/card/Card'

// common
import Alert from '@/common/Alert/default'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import UserListView from '@/views/admin/user/components/UserList'

// interfaces
import type { AlertProps } from '@/interfaces/Alert'

// Variables
import { formatData } from '@/views/admin/user/variables/data'
import { columns } from '@/views/admin/user/variables/columnsData'

// store
import { useUserStore } from '@/store/user'

// Services
import { useDeleteUser, useGetUsers } from '@/services/user'

// styles
import { Box, SimpleGrid } from '@chakra-ui/react'

export default function UserList (): JSX.Element {
  const router = useRouter()

  const [page, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, isLoading } = useGetUsers({ page, limit })

  const addUser = useUserStore(state => state.addUser)
  const cleanUser = useUserStore(state => state.cleanUser)

  const [alert, setAlert] = useState<AlertProps>({ message: 'hola', status: 'info' })

  const onSuccess = (): void => {
    setAlert({ message: 'Usuario eliminado correctamente', status: 'success' })
    void router.push('/admin/user/list')
  }

  const onError = (): void => {
    setAlert({ message: 'No se pudo eliminar al usuario', status: 'warning' })
  }

  const { mutate: deleteUser } = useDeleteUser({ onSuccess, onError })

  const users = useMemo(() => formatData(data?.data ?? [], router, addUser, deleteUser), [data, router, addUser, deleteUser])
  const total = useMemo(() => data?.total ?? 0, [data?.total])

  useEffect(() => {
    cleanUser()
  }, [cleanUser])

  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
          {!isEmpty(alert) && <Alert status={alert?.status} message={alert?.message} />}
          <Card flexDirection='column' w='100%' px='0px'>
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
