// libs
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import isEmpty from 'just-is-empty'

// Components
import Card from '@/components/card/Card'

// common
import Alert from '@/common/Alert/default'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import StudentListView from '@/views/admin/student/components/StudentList'

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'

// Variables
import { formatData } from '@/views/admin/student/variables/data'
import { columns } from '@/views/admin/student/variables/columnsData'

// store
import { useStudentStore } from '@/store/student'

// hooks
import { useNotification } from '@/hooks/useNotification'

// Services
import { useDeleteStudent, useGetStudents } from '@/services/student'

// styles
import { Box, SimpleGrid } from '@chakra-ui/react'

export default function StudentList (): JSX.Element {
  const router = useRouter()

  const [page, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [revalidate, setRevalidate] = useState(false)

  const { data, isLoading } = useGetStudents({ page, limit, revalidate })

  const addStudent = useStudentStore(state => state.addStudent)
  const cleanStudent = useStudentStore(state => state.cleanStudent)

  const [alert, setAlert] = useState<AlertProps>()
  const { showToast, showErrorToast } = useNotification()

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
    void router.push('/admin/student/list')
  }, [handleRefetch, showToast, router])

  const onDeleteError = useCallback((): void => {
    setAlert({ message: 'No se pudo eliminar al usuario', status: 'warning' })
    showErrorToast({ title: 'No se pudo eliminar al usuario', description: 'Por favor, intentar más tarde' })
  }, [showErrorToast])

  const { mutate: deleteStudent } = useDeleteStudent({ onSuccess: onDeleteSuccess, onError: onDeleteError })

  const students = useMemo(() => formatData(data?.data ?? [], router, addStudent, deleteStudent), [data, router, addStudent, deleteStudent])
  const total = useMemo(() => data?.total ?? 0, [data?.total])

  useEffect(() => {
    cleanStudent()
  }, [cleanStudent])

  const handleAddStudent = useCallback((): void => {
    void router.push('/admin/student/add')
  }, [router])

  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
          {!isEmpty(alert) && <Alert status={alert?.status} message={alert?.message} />}

          <Card flexDirection='column' w='100%' px='0'>
            <StudentListView
              handleAdd={handleAddStudent}
              handleRefresh={handleRefetch}
              columnsData={columns}
              tableData={students}
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
