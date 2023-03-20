// libs
import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

// interfaces
import type { AlertProps } from '@/interfaces/Alert'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import UserAddView from '@/views/admin/user/components/UserAdd'

// form
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// schema
import { registerUserSchema, type RegisterUserInput } from '@/schemas/user'

// services
import { useCreateUser } from '@/services/user'

// styles
import { Box } from '@chakra-ui/react'

export default function UserAdd (): JSX.Element {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { isLoading, isSubmitting }
  } = useForm<RegisterUserInput>({
    resolver: zodResolver(registerUserSchema)
  })

  const [alert, setAlert] = useState<AlertProps>()

  const onSuccess = (): void => {
    setAlert({ message: 'Usuario creado correctamente', status: 'success' })
    void router.push('/admin/user/list')
  }

  const onError = (): void => {
    setAlert({ message: 'El usuario o correo ya existe', status: 'warning' })
  }

  const { mutate } = useCreateUser({ onSuccess, onError })

  const useOnSubmit: SubmitHandler<RegisterUserInput> = useCallback(
    data => {
      mutate(data)
    },
    [mutate]
  )

  const onCancel = useCallback((): void => {
    router.back()
  }, [router])

  return (
    <AdminLayout navbarText='Agregar Usuario'>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <UserAddView control={control} alert={alert} disabled={!isLoading || isSubmitting} onSubmit={handleSubmit(useOnSubmit)} onCancel={onCancel} />
      </Box>
    </AdminLayout>
  )
}
