// libs
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import isEmpty from 'just-is-empty'

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'
import type { User } from '@/interfaces/api/User'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import UserEditView from '@/views/admin/user/components/UserEdit'

// store
import { useUserStore } from '@/store/user'

// hooks
import { useNotification } from '@/hooks/useNotification'

// form
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// schema
import { updateStudentSchema, type UpdateStudentInput } from '@/schemas/user'

// services
import { useUpdateUser } from '@/services/user'

// styles
import { Box } from '@chakra-ui/react'

export default function UserEdit (): JSX.Element {
  const router = useRouter()
  const { showToast, showErrorToast } = useNotification()

  const userId = useMemo(() => router.query.id as string, [router.query.id])

  const user = useUserStore(state => state.user) as User
  const cleanUser = useUserStore(state => state.cleanUser)

  const [closeEdit, setCloseEdit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid }
  } = useForm<UpdateStudentInput>({
    resolver: zodResolver(updateStudentSchema)
  })

  useEffect(() => {
    if (closeEdit) return
    if (isEmpty(user)) {
      showErrorToast({ title: 'No se pudo encontrar el usuario', description: 'Por favor, intentar más tarde' })
      void router.push('/admin/user/list')
      return
    }

    setValue('id', userId ?? '')
    setValue('name', user.name)
    setValue('email', user.email)
  }, [user, userId, router, closeEdit, setValue, showErrorToast])

  const [alert, setAlert] = useState<AlertProps>()

  const onUpdateSuccess = useCallback((): void => {
    showToast({ title: 'Usuario editado correctamente', description: `El usuario ${user.name} se ha editado correctamente` })

    setIsSubmitting(false)
    void router.push('/admin/user/list')
  }, [user, router, showToast])

  const onUpdateError = useCallback((): void => {
    setAlert({ message: 'El usuario o correo ya existe', status: 'warning' })
    showErrorToast({ title: 'El usuario o correo ya existe', description: 'Por favor, ingresar otro usuario o correo' })
  }, [showErrorToast])

  const { mutate: updateUser } = useUpdateUser({ onSuccess: onUpdateSuccess, onError: onUpdateError })

  const useOnSubmit: SubmitHandler<UpdateStudentInput> = useCallback(
    data => {
      setIsSubmitting(true)
      updateUser({ ...data, id: userId })
    },
    [updateUser, userId]
  )

  const onCancel = useCallback((): void => {
    cleanUser()
    setCloseEdit(true)
    router.back()
  }, [router, cleanUser, setCloseEdit])

  return (
    <AdminLayout navbarText='Editar Usuario'>
      <Box pt={{ base: '28', md: '24', xl: '24' }}>
        <UserEditView control={control} alert={alert} isDisabled={!isValid || isSubmitting} isSubmitting={isSubmitting} onSubmit={handleSubmit(useOnSubmit)} onCancel={onCancel} />
      </Box>
    </AdminLayout>
  )
}
