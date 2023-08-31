// libs
import { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import CourseAddView from '@/views/admin/course/components/Add'

// hooks
import { useNotification } from '@/hooks/useNotification'

import { UNIQUE_PROGRAM_OPTIONS } from '@/constants/course'

// services
import { useCreateCourse } from '@/services/course'

// form
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// schema
import { registerCourseSchema, type RegisterCourseInput } from '@/schemas/course'

// styles
import { Box } from '@chakra-ui/react'
export default function CourseAdd (): JSX.Element {
  const router = useRouter()
  const { showToast, showErrorToast } = useNotification()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValues = {
    name: '',
    code: '',
    uniqueProgram: undefined,
    startDate: undefined,
    endDate: undefined,
    amount: undefined,
    discount: undefined,
    total: undefined,
    status: undefined
  }

  const uniqueProgramOptions = useMemo(() => UNIQUE_PROGRAM_OPTIONS, [])

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid }
  } = useForm<RegisterCourseInput>({
    resolver: zodResolver(registerCourseSchema),
    defaultValues
  })

  const [alert, setAlert] = useState<AlertProps>()

  const onSuccess = (): void => {
    showToast({ title: 'Course successfully created', description: 'The course has been successfully created' })
    setIsSubmitting(false)

    void router.push('/admin/course/list')
  }

  const onError = (): void => {
    setAlert({ message: "Course can't save", status: 'warning' })
    showErrorToast({ title: "Course can't save", description: 'Please, verify your data' })
  }

  const { mutate: addCourse } = useCreateCourse({ onSuccess, onError })

  const useOnSubmit: SubmitHandler<RegisterCourseInput> = useCallback(data => {
    console.log('🚀 ~ file: add.tsx:97 ~ CourseAdd ~ data:', data)
    setIsSubmitting(true)
    addCourse(data)
  }, [addCourse])

  const onCancel = useCallback(() => { router.back() }, [router])

  return (
    <AdminLayout navbarText='Add Course'>
      <Box pt={{ base: '28', md: '24', xl: '24' }}>
        <CourseAddView
          uniqueProgramOptions={uniqueProgramOptions}
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
