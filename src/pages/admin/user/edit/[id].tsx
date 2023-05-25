// libs
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import isEmpty from 'just-is-empty'

// interfaces
import type { AlertProps } from '@/interfaces/Alert'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import UserEditView from '@/views/admin/user/components/UserEdit'

// store
import { useUserStore } from '@/store/user'

// form
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// schema
import { registerUserSchema, type RegisterUserInput } from '@/schemas/user'

// services
import { useUpdateUser } from '@/services/user'

// styles
import { Box } from '@chakra-ui/react'
import type { User } from '@/interfaces/User'

export default function UserEdit (): JSX.Element {
  const router = useRouter()

  const userId = useMemo(() => router.query.id as string, [router.query.id])

  const user = useUserStore(state => state.user) as User
  const cleanUser = useUserStore(state => state.cleanUser)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isLoading, isSubmitting }
  } = useForm<RegisterUserInput>({
    resolver: zodResolver(registerUserSchema)
  })

  useEffect(() => {
    if (isEmpty(user)) {
      setAlert({ message: 'No se pudo encontrar el usuario', status: 'error' })
      void router.push('/admin/user/list')
      return
    }

    setValue('username', user.username ?? '')
    setValue('name', user.name)
    setValue('email', user.email)
    setValue('password', user?.password ?? '')
  }, [user, router, setValue])

  const [alert, setAlert] = useState<AlertProps>()

  const onCreateSuccess = useCallback((): void => {
    setAlert({ message: 'Usuario editado correctamente', status: 'success' })
    void router.push('/admin/user/list')
  }, [router])

  const onCreateError = useCallback((): void => {
    setAlert({ message: 'El usuario o correo ya existe', status: 'warning' })
  }, [])

  const { mutate: updateUser } = useUpdateUser({ onSuccess: onCreateSuccess, onError: onCreateError })

  const useOnSubmit: SubmitHandler<RegisterUserInput> = useCallback(
    data => {
      updateUser({ id: userId, ...data })
    },
    [updateUser, userId]
  )

  const onCancel = useCallback((): void => {
    cleanUser()
    router.back()
  }, [router, cleanUser])

  return (
    <AdminLayout navbarText='Editar Usuario'>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <UserEditView control={control} alert={alert} disabled={isLoading || isSubmitting} onSubmit={handleSubmit(useOnSubmit)} onCancel={onCancel} />
      </Box>
    </AdminLayout>
  )
}
