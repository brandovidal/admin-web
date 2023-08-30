// libs
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'
import type { Course } from '@/interfaces/api/Course'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import CourseEditView from '@/views/admin/course/components/Edit'

// hooks
import { useNotification } from '@/hooks/useNotification'

// services
import { useUpdateCourse } from '@/services/course'

import { useCourseStore } from '@/store/course'

import { formatDate } from '@/utils/date'

// form
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// schema
import { updateCourseSchema, type UpdateCourseInput } from '@/schemas/course'

// styles
import { Box } from '@chakra-ui/react'

import isEmpty from 'just-is-empty'

export default function CourseEdit (): JSX.Element {
  const router = useRouter()
  const { showToast, showErrorToast } = useNotification()

  const courseId = useMemo(() => router.query.id as string, [router.query.id])

  const course = useCourseStore(state => state.course) as Course
  const cleanUser = useCourseStore(state => state.cleanCourse)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValues = {
    name: '',
    code: '',
    course: '',
    courseId: '',
    startDate: undefined,
    endDate: undefined,
    amount: undefined,
    discount: undefined,
    total: undefined,
    status: undefined
  }

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid }
  } = useForm<UpdateCourseInput>({
    resolver: zodResolver(updateCourseSchema),
    defaultValues
  })

  useEffect(() => {
    if (isEmpty(course)) {
      // showErrorToast({ title: 'No se pudo encontrar el estudiante', description: 'Please try again later' })
      void router.push('/admin/course/list')
      return
    }

    const startDate = formatDate(course?.startDate ?? '')
    const endDate = formatDate(course?.endDate ?? '')
    // const formattedValue = course?.amount ?? null
    // const amount = { formattedValue: String(formattedValue), value: formattedValue, floatValue: formattedValue }

    setValue('id', courseId ?? '')
    setValue('name', course.name)
    setValue('code', course.code)
    setValue('startDate', startDate)
    setValue('endDate', endDate)
    // setValue('amount', amount as unknown as number)
    setValue('amount', (course?.amount ?? '') as number)
    setValue('discount', (course?.discount ?? '') as number)
    setValue('total', (course?.total ?? '') as number)
  }, [course, router, courseId, setValue])

  const [alert, setAlert] = useState<AlertProps>()

  const onSuccess = (): void => {
    showToast({ title: 'Course successfully updated', description: 'The course has been successfully updated' })
    setIsSubmitting(false)

    void router.push('/admin/course/list')
  }

  const onError = (): void => {
    setAlert({ message: "Course can't save", status: 'warning' })
    showErrorToast({ title: "Course can't save", description: 'Please, verify your data' })
  }

  const { mutate: editCourse } = useUpdateCourse({ onSuccess, onError })

  const useOnSubmit: SubmitHandler<UpdateCourseInput> = useCallback(data => {
    console.log('🚀 ~ file: add.tsx:97 ~ CourseEdit ~ data:', data)
    setIsSubmitting(false)
    editCourse(data)
  }, [editCourse])

  const onCancel = useCallback((): void => {
    cleanUser()
    router.back()
  }, [router, cleanUser])

  return (
    <AdminLayout navbarText='Edit Course'>
      <Box pt={{ base: '28', md: '24', xl: '24' }}>
        <CourseEditView
          control={control}
          watch={watch}
          setValue={setValue}
          alert={alert}
          isDisabled={!isValid || isSubmitting}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit(useOnSubmit)}
          onCancel={onCancel} />
      </Box>
    </AdminLayout>
  )
}
