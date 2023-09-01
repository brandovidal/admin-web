// libs
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'
import type { Program } from '@/interfaces/api/Program'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import CourseAddView from '@/views/admin/course/components/Add'

// hooks
import { useNotification } from '@/hooks/useNotification'
import { sanitize } from '@/utils/string'

import { UNIQUE_PROGRAM_OPTIONS } from '@/constants/course'

// services
import { useCreateCourse } from '@/services/course'
import { useCreateProgram } from '@/services/program'

// form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// schema
import { registerCourseSchema, type RegisterCourseInput, transformDataCourse } from '@/schemas/course'

// styles
import { Box } from '@chakra-ui/react'

import isEmpty from 'just-is-empty'

export default function CourseAdd (): JSX.Element {
  const router = useRouter()

  const { showToast, showErrorToast } = useNotification()
  const [alert, setAlert] = useState<AlertProps>()

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
    trigger,
    formState: { isValid }
  } = useForm<RegisterCourseInput>({
    resolver: zodResolver(registerCourseSchema),
    defaultValues
  })

  function useOnChangeName () {
    const name = watch('name', '')

    useEffect(() => {
      function updateInput () {
        if (isEmpty(name)) {
          setValue('code', '')
          return
        }

        const code = sanitize(name, '-')
        setValue('code', code)
        void trigger('code')
      }

      updateInput()

      return () => {
        updateInput()
      }
    }, [name])
  }

  function useOnChangeTotal () {
    const amount = watch('amount')
    const discount = watch('discount')

    useEffect(() => {
      function updateInput () {
        const amountValue = Number(amount?.floatValue ?? 0)
        const discountValue = Number(discount?.floatValue ?? 0)

        const total = amountValue - discountValue

        setValue('total', total)
      }

      updateInput()

      return () => {
        updateInput()
      }
    }, [amount, discount])
  }

  const uniqueProgram = watch('uniqueProgram', null)
  const hasUniqueProgram = useMemo(() => uniqueProgram === 'yes', [uniqueProgram])

  const onSuccessCourse = ({ data }): void => {
    console.log('🚀 ~ file: add.tsx:120 ~ onSuccess ~ data:', data)

    if (hasUniqueProgram) {
      showToast({ title: 'Course successfully created', description: 'The course has been successfully created' })
      setIsSubmitting(false)

      void router.push('/admin/course/list')
      return
    }

    const { uniqueProgram, ...arg } = data

    const program = {
      ...arg,
      courseId: data?.id ?? ''
    }
    console.log('🚀 ~ file: add.tsx:135 ~ onSuccess ~ program:', program)
    createProgram(program as Program)

    showToast({ title: 'Course successfully created', description: 'The course has been successfully created' })
  }
  const onSuccessProgram = ({ data }): void => {
    console.log('🚀 ~ file: add.tsx:142 ~ onSuccessProgram ~ data:', data)

    showToast({ title: 'Program successfully created', description: 'Program has been successfully created' })
    setIsSubmitting(false)

    void router.push('/admin/course/list')
  }

  const onError = (): void => {
    setAlert({ message: "Course can't save", status: 'warning' })
    showErrorToast({ title: "Course can't save", description: 'Please, verify your data' })
  }

  const { mutate: createCourse } = useCreateCourse({ onSuccess: onSuccessCourse, onError })
  const { mutate: createProgram } = useCreateProgram({ onSuccess: onSuccessProgram, onError })

  const handleOnSubmit = handleSubmit(arg => {
    const data = transformDataCourse(arg)
    console.log('🚀 ~ file: add.tsx:148 ~ handleOnSubmit ~ data:', data)
    setIsSubmitting(true)

    createCourse(data)
  })

  const onCancel = useCallback(() => { router.back() }, [router])

  return (
    <AdminLayout navbarText='Add Course'>
      <Box pt={{ base: '28', md: '24', xl: '24' }}>
        <CourseAddView
          uniqueProgramOptions={uniqueProgramOptions}
          control={control}
          alert={alert}
          isDisabled={!isValid || isSubmitting}
          isSubmitting={isSubmitting}
          onSubmit={handleOnSubmit}
          useOnChangeName={useOnChangeName}
          useOnChangeTotal={useOnChangeTotal}
          hasUniqueProgram={hasUniqueProgram}
          onCancel={onCancel} />
      </Box>
    </AdminLayout>
  )
}
