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
import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react'

import type { Student } from '@/interfaces/api/Student'

export default function StudentList (): JSX.Element {
  const router = useRouter()

  const [page, pageChangeHandler] = useState(1)
  const [limit, pageSizeHandler] = useState(5)

  const { data: students, isLoading, refetch } = useGetStudents({ page, limit })

  const student = useStudentStore((state) => state.student) as Student
  const addStudent = useStudentStore(state => state.addStudent)
  const cleanStudent = useStudentStore(state => state.cleanStudent)

  const [alert, setAlert] = useState<AlertProps>()
  const { showToast, showErrorToast } = useNotification()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleRefresh = useCallback(
    async (): Promise<void> => {
      await refetch()
    },
    [refetch]
  )

  const onDeleteSuccess = useCallback(async (): Promise<void> => {
    setAlert({ message: 'Student successfully deleted', status: 'success' })
    showToast({ title: 'Student successfully deleted', description: 'The student has been successfully deleted' })
    await handleRefresh()
    void router.push('/admin/student/list')
  }, [handleRefresh, showToast, router])

  const onDeleteError = useCallback((): void => {
    setAlert({ message: 'Student could not be deleted', status: 'warning' })
    showErrorToast({ title: 'Student could not be deleted', description: 'Please try again later' })
  }, [showErrorToast])

  const { mutate: deleteStudent } = useDeleteStudent({ onSuccess: onDeleteSuccess, onError: onDeleteError })

  const confirmDelete = useCallback(
    (student: Student): void => {
      onOpen()
      addStudent(student)
    },
    [onOpen, addStudent]
  )

  const onCloseComplete = useCallback((): void => {
    deleteStudent(student)
    onClose()
  }, [student, onClose, deleteStudent])

  const handleEdit = useCallback((student: Student) => {
    addStudent(student)
    void router.push(`/admin/student/edit/${student.id as string}`)
  }, [addStudent, router])

  const handleDelete = useCallback((student: Student) => {
    confirmDelete(student)
  }, [confirmDelete])

  const tableData = useMemo(() => formatData(students?.data, handleEdit, handleDelete), [students, handleEdit, handleDelete])
  const pagination = useMemo(() => students?.meta?.pagination, [students?.meta?.pagination])

  useEffect(() => {
    cleanStudent()
  }, [cleanStudent])

  const handleAddStudent = useCallback((): void => {
    void router.push('/admin/student/add')
  }, [router])

  return (
    <AdminLayout>
      <Box pt={{ base: '28', md: '24', xl: '24' }}>
        <SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
          {!isEmpty(alert) && <Alert status={alert?.status} message={alert?.message} />}

          <Dialog title='Delete Student' message='Are you sure you want to delete this student' isOpen={isOpen} onClose={onClose} onCloseComplete={onCloseComplete} />

          <Card flexDirection='column' w='100%' px='0'>
            <StudentListView
              handleAdd={handleAddStudent}
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
