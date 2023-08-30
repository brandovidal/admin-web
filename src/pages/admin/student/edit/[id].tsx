// libs
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'
import type { Student } from '@/interfaces/api/Student'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import StudentEditView from '@/views/admin/student/components/StudentEdit'

// hooks
import { useNotification } from '@/hooks/useNotification'

// services
import { useUpdateStudent } from '@/services/student'

import { useStudentStore } from '@/store/student'

import { COUNTRY_OPTIONS, STATUS_OPTIONS, TRAINING_OPTIONS } from '@/constants/student'

// form
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// schema
import { updateStudentSchema, type UpdateStudentInput } from '@/schemas/student'

import { formatDate } from '@/utils/date'

// styles
import { Box } from '@chakra-ui/react'

import isEmpty from 'just-is-empty'

export default function StudentEdit (): JSX.Element {
  const router = useRouter()
  const { showToast, showErrorToast } = useNotification()

  const studentId = useMemo(() => router.query.id as string, [router.query.id])

  const student = useStudentStore(state => state.student) as Student
  const cleanUser = useStudentStore(state => state.cleanStudent)

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
    formattedValue: '',
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
  } = useForm<UpdateStudentInput>({
    resolver: zodResolver(updateStudentSchema),
    defaultValues
  })

  useEffect(() => {
    if (isEmpty(student)) {
      // showErrorToast({ title: 'No se pudo encontrar el estudiante', description: 'Please try again later' })
      void router.push('/admin/student/list')
      return
    }

    const country = countryOptions.find(option => option.value === student?.country) ?? { value: '', label: '' }
    const birthday = formatDate(student?.birthday ?? '')
    const formattedValue = student?.phone ?? null
    const phone = { formattedValue: String(formattedValue), value: formattedValue, floatValue: formattedValue }
    const status = (student?.status ?? false) ? 'active' : 'inactive'

    setValue('id', studentId ?? '')
    setValue('name', student.name)
    setValue('lastname', student.lastname)
    setValue('birthday', birthday as unknown as string)
    setValue('country', country as unknown as string)
    setValue('phone', phone as unknown as number)
    setValue('dni', student?.dni as number)
    setValue('email', student?.email)
    setValue('ladline', (student?.ladline ?? '') as number)
    setValue('ruc', (student?.ruc ?? '') as number)
    setValue('status', status as unknown as boolean)
    setValue('businessName', student?.businessName ?? '')
    setValue('studyCenter', student?.studyCenter ?? '')
    setValue('postgraduateTraining', student?.postgraduateTraining ?? false)
    setValue('graduateTraining', student?.graduateTraining ?? false)
    setValue('bachelorTraining', student?.bachelorTraining ?? false)
    setValue('studentTraining', student?.studentTraining ?? false)
    setValue('workplace', student?.workplace ?? '')
    setValue('workPosition', student?.workPosition ?? '')
    setValue('workAddress', student?.workAddress ?? '')
  }, [student, router, studentId, setValue, countryOptions])

  const [alert, setAlert] = useState<AlertProps>()

  const onSuccess = (): void => {
    showToast({ title: 'Student successfully updated', description: 'The student has been successfully updated' })
    setIsSubmitting(false)

    void router.push('/admin/student/list')
  }

  const onError = (): void => {
    setAlert({ message: "Student can't save", status: 'warning' })
    showErrorToast({ title: "Student can't save", description: 'Please, verify your data' })
  }

  const { mutate: updateStudent } = useUpdateStudent({ onSuccess, onError })

  const useOnSubmit: SubmitHandler<UpdateStudentInput> = useCallback(data => {
    setIsSubmitting(true)
    updateStudent(data)
  }, [updateStudent])

  const onCancel = useCallback((): void => {
    cleanUser()
    router.back()
  }, [router, cleanUser])

  return (
    <AdminLayout navbarText='Edit Student'>
      <Box pt={{ base: '28', md: '24', xl: '24' }}>
        <StudentEditView
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
