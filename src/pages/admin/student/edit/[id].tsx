// libs
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import isEmpty from 'just-is-empty'

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'
import type { Student } from '@/interfaces/api/Student'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import StudentEditView from '@/views/admin/student/components/StudentEdit'

// store
import { useStudentStore } from '@/store/student'

// hooks
import { useNotification } from '@/hooks/useNotification'

// form
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// schema
import { registerStudentSchema, type RegisterStudentInput } from '@/schemas/student'

// services
import { useUpdateStudent } from '@/services/student'

// styles
import { Box } from '@chakra-ui/react'

export default function StudentEdit (): JSX.Element {
  const router = useRouter()
  const { showToast, showErrorToast } = useNotification()

  const studentId = useMemo(() => router.query.id as string, [router.query.id])

  const student = useStudentStore(state => state.student) as Student
  const cleanStudent = useStudentStore(state => state.cleanStudent)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isLoading, isSubmitting }
  } = useForm<RegisterStudentInput>({
    resolver: zodResolver(registerStudentSchema)
  })

  useEffect(() => {
    if (isEmpty(student)) {
      showErrorToast({ title: 'No se pudo encontrar el usuario', description: 'Por favor, intentar más tarde' })
      void router.push('/admin/student/list')
      return
    }

    setValue('username', student.username ?? '')
    setValue('name', student.name)
    setValue('email', student.email)
    setValue('password', student?.password ?? '')
  }, [student, router, setValue, showErrorToast])

  const [alert, setAlert] = useState<AlertProps>()

  const onCreateSuccess = useCallback((): void => {
    showToast({ title: 'Usuario editado correctamente', description: 'El usuario se ha editado correctamente' })
    void router.push('/admin/student/list')
  }, [router, showToast])

  const onCreateError = useCallback((): void => {
    setAlert({ message: 'El usuario o correo ya existe', status: 'warning' })
    showErrorToast({ title: 'El usuario o correo ya existe', description: 'Por favor, ingresar otro usuario o correo' })
  }, [showErrorToast])

  const { mutate: updateStudent } = useUpdateStudent({ onSuccess: onCreateSuccess, onError: onCreateError })

  const useOnSubmit: SubmitHandler<RegisterStudentInput> = useCallback(
    data => {
      updateStudent({ id: studentId, ...data })
    },
    [updateStudent, studentId]
  )

  const onCancel = useCallback((): void => {
    cleanStudent()
    router.back()
  }, [router, cleanStudent])

  return (
    <AdminLayout navbarText='Editar Usuario'>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <StudentEditView control={control} alert={alert} disabled={isLoading || isSubmitting} onSubmit={handleSubmit(useOnSubmit)} onCancel={onCancel} />
      </Box>
    </AdminLayout>
  )
}
