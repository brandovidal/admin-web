// libs
import { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import StudentAddView from '@/views/admin/student/components/StudentAdd'

// hooks
import { useNotification } from '@/hooks/useNotification'

// services
import { useCreateStudent } from '@/services/student'

import { COUNTRY_OPTIONS, STATUS_OPTIONS, TRAINING_OPTIONS } from '@/constants/student'

// form
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// schema
import { registerStudentSchema, type RegisterStudentInput } from '@/schemas/student'

// styles
import { Box } from '@chakra-ui/react'

export default function StudentAdd (): JSX.Element {
  const router = useRouter()
  const { showToast, showErrorToast } = useNotification()

  const countryOptions = useMemo(() => COUNTRY_OPTIONS, [])

  const trainingOptions = useMemo(() => TRAINING_OPTIONS, [])

  const statusOptions = useMemo(() => STATUS_OPTIONS, [])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValues = {
    name: '',
    lastname: '',
    birthday: undefined,
    address: '',
    country: undefined,
    phone: undefined,
    dni: undefined,
    email: '',
    phoneFormatted: '',
    ladline: undefined,
    ruc: undefined,
    businessName: '',
    studyCenter: '',
    training: undefined,
    postgraduateTraining: false,
    graduateTraining: false,
    bachelorTraining: true,
    studentTraining: false,
    workplace: '',
    workPosition: '',
    workAddress: '',
    status: undefined
  }

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid }
  } = useForm<RegisterStudentInput>({
    resolver: zodResolver(registerStudentSchema),
    defaultValues
  })

  const [alert, setAlert] = useState<AlertProps>()

  const onSuccess = (): void => {
    showToast({ title: 'User successfully created', description: 'The user has been successfully created' })
    setIsSubmitting(false)

    void router.push('/admin/student/list')
  }

  const onError = (): void => {
    setAlert({ message: "Student can't save", status: 'warning' })
    showErrorToast({ title: "Student can't save", description: 'Please, verify your data' })
  }

  const { mutate: addStudent } = useCreateStudent({ onSuccess, onError })

  const useOnSubmit: SubmitHandler<RegisterStudentInput> = useCallback(data => {
    setIsSubmitting(true)
    addStudent(data)
  }, [addStudent])

  const onCancel = useCallback(() => { router.back() }, [router])

  return (
    <AdminLayout navbarText='Add Student'>
      <Box pt={{ base: '28', md: '24', xl: '24' }}>
        <StudentAddView
          countryOptions={countryOptions}
          trainingOptions={trainingOptions}
          statusOptions={statusOptions}
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
