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
import { registerUserSchema, type RegisterUserInput } from '@/schemas/user'

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

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isLoading, isSubmitting }
  } = useForm<RegisterUserInput>({
    resolver: zodResolver(registerUserSchema)
  })

  useEffect(() => {
    console.log("🚀 ~ file: [id].tsx:55 ~ useEffect ~ user:", user, closeEdit)
    if(closeEdit) return
    if (isEmpty(user)) {
      showErrorToast({ title: 'No se pudo encontrar el usuario', description: 'Por favor, intentar más tarde' })
      void router.push('/admin/user/list')
      return
    }

    setValue('username', user.username ?? '')
    setValue('name', user.name)
    setValue('email', user.email)
    setValue('password', user?.password ?? '')
  }, [user, router, setValue, showErrorToast])

  const [alert, setAlert] = useState<AlertProps>()

  const onCreateSuccess = useCallback((): void => {
    showToast({ title: 'Usuario editado correctamente', description: 'El usuario se ha editado correctamente' })
    void router.push('/admin/user/list')
  }, [router, showToast])

  const onCreateError = useCallback((): void => {
    setAlert({ message: 'El usuario o correo ya existe', status: 'warning' })
    showErrorToast({ title: 'El usuario o correo ya existe', description: 'Por favor, ingresar otro usuario o correo' })
  }, [showErrorToast])

  const { mutate: updateUser } = useUpdateUser({ onSuccess: onCreateSuccess, onError: onCreateError })

  const useOnSubmit: SubmitHandler<RegisterUserInput> = useCallback(
    data => {
      updateUser({ id: userId, ...data })
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
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <UserEditView control={control} alert={alert} disabled={isLoading || isSubmitting} onSubmit={handleSubmit(useOnSubmit)} onCancel={onCancel} />
      </Box>
    </AdminLayout>
  )
}
