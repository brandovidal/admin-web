// libs
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import isEmpty from 'just-is-empty'

// Components
import Card from '@/components/card/Card'

// common
import Alert from '@/common/Alert/default'
import Dialog from '@/common/Dialog/default'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import UserListView from '@/views/admin/user/components/UserList'

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'
import { type User } from '@/interfaces/api/User'

// Variables
import { formatData } from '@/views/admin/user/variables/data'
import { columns } from '@/views/admin/user/variables/columnsData'

// store
import { useUserStore } from '@/store/user'

// hooks
import { useNotification } from '@/hooks/useNotification'

// Services
import { useDeleteUser, useGetUsers } from '@/services/user'

// styles
import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react'

export default function UserList (): JSX.Element {
  const router = useRouter()

  const [page, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [revalidate, setRevalidate] = useState(false)

  const { data, isLoading } = useGetUsers({ page, limit, revalidate })

  const user = useUserStore(state => state.user) as User
  const addUser = useUserStore(state => state.addUser)
  const cleanUser = useUserStore(state => state.cleanUser)

  const [alert, setAlert] = useState<AlertProps>()
  const { showToast, showErrorToast } = useNotification()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleRefetch = useCallback(
    async (): Promise<void> => {
      setRevalidate(prevState => !prevState)
    },
    [setRevalidate]
  )

  const onDeleteSuccess = useCallback(async (): Promise<void> => {
    setAlert({ message: 'Usuario eliminado correctamente', status: 'success' })
    showToast({ title: 'Usuario eliminado correctamente', description: 'El usuario se ha eliminado correctamente' })
    await handleRefetch()
    void router.push('/admin/user/list')
  }, [handleRefetch, showToast, router])

  const onDeleteError = useCallback((): void => {
    setAlert({ message: 'No se pudo eliminar al usuario', status: 'warning' })
    showErrorToast({ title: 'No se pudo eliminar al usuario', description: 'Por favor, intentar más tarde' })
  }, [showErrorToast])

  const { mutate: deleteUser } = useDeleteUser({ onSuccess: onDeleteSuccess, onError: onDeleteError })

  const confirmDelete = useCallback((user): void => {
    onOpen()
    addUser(user)
  }, [onOpen, addUser])

  const onCloseComplete = useCallback((): void => {
    deleteUser(user)
    onClose()
  }, [user, onClose, deleteUser])

  const users = useMemo(() => formatData(data?.data ?? [], router, addUser, confirmDelete), [data, router, addUser, confirmDelete])
  const total = useMemo(() => data?.total ?? 0, [data?.total])

  useEffect(() => {
    cleanUser()
  }, [cleanUser])

  const handleAddUser = useCallback((): void => {
    void router.push('/admin/user/add')
  }, [router])

  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
          {!isEmpty(alert) && <Alert status={alert?.status} message={alert?.message} />}
          <Dialog title='Delete User' message='Are you sure you want to delete this user' isOpen={isOpen} onClose={onClose} onCloseComplete={onCloseComplete} />

          <Card flexDirection='column' w='100%' px='0'>
            <UserListView
              handleAdd={handleAddUser}
              handleRevalidate={handleRefetch}
              columnsData={columns}
              tableData={users}
              isLoading={isLoading}
              total={total}
              page={page}
              pageChangeHandler={setCurrentPage}
              limit={limit}
              limitChangeHandler={setLimit}
            />
          </Card>
        </SimpleGrid>
      </Box>
    </AdminLayout>
  )
}
