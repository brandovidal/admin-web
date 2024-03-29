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

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'
import { type User } from '@/interfaces/api/User'

export default function UserList (): JSX.Element {
  const router = useRouter()

  const [page, pageChangeHandler] = useState(1)
  const [limit, pageSizeHandler] = useState(5)

  const { data: users, isLoading, refetch } = useGetUsers({ page, limit })

  const user = useUserStore((state) => state.user) as User
  const addUser = useUserStore((state) => state.addUser)
  const cleanUser = useUserStore((state) => state.cleanUser)

  const [alert, setAlert] = useState<AlertProps>()
  const { showToast, showErrorToast } = useNotification()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleRefresh = useCallback(async (): Promise<void> => {
    await refetch()
  }, [refetch])

  const onDeleteSuccess = useCallback(async (): Promise<void> => {
    setAlert({ message: 'User successfully deleted', status: 'success' })
    showToast({ title: 'User successfully deleted', description: 'The user has been successfully deleted' })

    await handleRefresh()
    void router.push('/admin/user/list')
  }, [handleRefresh, showToast, router])

  const onDeleteError = useCallback((): void => {
    setAlert({ message: 'User could not be deleted', status: 'warning' })
    showErrorToast({ title: 'User could not be deleted', description: 'Please try again later' })
  }, [showErrorToast])

  const { mutate: deleteUser } = useDeleteUser({ onSuccess: onDeleteSuccess, onError: onDeleteError })

  const confirmDelete = useCallback(
    (user: User): void => {
      onOpen()
      addUser(user)
    },
    [onOpen, addUser]
  )

  const onCloseComplete = useCallback((): void => {
    deleteUser(user)
    onClose()
  }, [user, onClose, deleteUser])

  const handleEdit = useCallback((user: User) => {
    addUser(user)
    void router.push(`/admin/user/edit/${user.id as string}`)
  }, [addUser, router])

  const handleDelete = useCallback((user: User) => {
    confirmDelete(user)
  }, [confirmDelete])

  const tableData = useMemo(() => formatData(users?.data, handleEdit, handleDelete), [users, handleEdit, handleDelete])
  const pagination = useMemo(() => users?.meta?.pagination, [users?.meta?.pagination])

  useEffect(() => {
    cleanUser()
  }, [cleanUser])

  const handleAddUser = useCallback((): void => {
    void router.push('/admin/user/add')
  }, [router])

  return (
    <AdminLayout>
      <Box pt={{ base: '28', md: '24', xl: '24' }}>
        <SimpleGrid mb="20px" columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
          {!isEmpty(alert) && <Alert status={alert?.status} message={alert?.message} />}

          <Dialog title="Delete User" message="Are you sure you want to delete this user" isOpen={isOpen} onClose={onClose} onCloseComplete={onCloseComplete} />

          <Card flexDirection="column" w="100%" px="0">
            <UserListView
              handleAdd={handleAddUser}
              handleRefresh={handleRefresh}
              columnsData={columns}
              tableData={tableData}
              isLoading={isLoading}
              pagination={pagination}
              pageChangeHandler={pageChangeHandler}
              pageSizeHandler={pageSizeHandler}
            />
          </Card>
        </SimpleGrid>
      </Box>
    </AdminLayout>
  )
}
