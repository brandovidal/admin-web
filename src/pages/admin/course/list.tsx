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
import CourseListView from '@/views/admin/course/components/List'

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'

// Variables
import { formatData } from '@/views/admin/course/variables/data'
import { columns } from '@/views/admin/course/variables/columnsData'

// store
import { useCourseStore } from '@/store/course'

// hooks
import { useNotification } from '@/hooks/useNotification'

// Services
import { useDeleteCourse, useGetCourses } from '@/services/course'

// styles
import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react'

import type { Course } from '@/interfaces/api/Course'

export default function CourseList (): JSX.Element {
  const router = useRouter()

  const [page, pageChangeHandler] = useState(1)
  const [limit, pageSizeHandler] = useState(5)

  const { data: courses, isLoading, refetch } = useGetCourses({ page, limit })

  const course = useCourseStore((state) => state.course) as Course
  const addCourse = useCourseStore(state => state.addCourse)
  const cleanCourse = useCourseStore(state => state.cleanCourse)

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
    setAlert({ message: 'Course successfully deleted', status: 'success' })
    showToast({ title: 'Course successfully deleted', description: 'The course has been successfully deleted' })
    await handleRefresh()
    void router.push('/admin/course/list')
  }, [handleRefresh, showToast, router])

  const onDeleteError = useCallback((): void => {
    setAlert({ message: 'Course could not be deleted', status: 'warning' })
    showErrorToast({ title: 'Course could not be deleted', description: 'Please try again later' })
  }, [showErrorToast])

  const { mutate: deleteCourse } = useDeleteCourse({ onSuccess: onDeleteSuccess, onError: onDeleteError })

  const confirmDelete = useCallback(
    (course: Course): void => {
      onOpen()
      addCourse(course)
    },
    [onOpen, addCourse]
  )

  const onCloseComplete = useCallback((): void => {
    deleteCourse(course)
    onClose()
  }, [course, onClose, deleteCourse])

  const handleEdit = useCallback((course: Course) => {
    addCourse(course)
    void router.push(`/admin/course/edit/${course.id as string}`)
  }, [addCourse, router])

  const handleDelete = useCallback((course: Course) => {
    confirmDelete(course)
  }, [confirmDelete])

  const tableData = useMemo(() => formatData(courses?.data, handleEdit, handleDelete), [courses, handleEdit, handleDelete])
  const pagination = useMemo(() => courses?.meta?.pagination, [courses?.meta?.pagination])

  useEffect(() => {
    cleanCourse()
  }, [cleanCourse])

  const handleAddCourse = useCallback((): void => {
    void router.push('/admin/course/add')
  }, [router])

  return (
    <AdminLayout>
      <Box pt={{ base: '28', md: '24', xl: '24' }}>
        <SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
          {!isEmpty(alert) && <Alert status={alert?.status} message={alert?.message} />}

          <Dialog title='Delete Course' message='Are you sure you want to delete this course' isOpen={isOpen} onClose={onClose} onCloseComplete={onCloseComplete} />

          <Card flexDirection='column' w='100%' px='0'>
            <CourseListView
              handleAdd={handleAddCourse}
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
