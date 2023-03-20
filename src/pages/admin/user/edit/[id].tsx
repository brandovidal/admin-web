// libs
import { useMemo, useState } from 'react'
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
import { useUpdateUser } from '@/services/user'

// styles
import { Box } from '@chakra-ui/react'

export default function UserEdit (): JSX.Element {
  const router = useRouter()

  const userId = useMemo(() => router.query.id, [router.query.id])

  const {
    control,
    handleSubmit,
    formState: { isLoading, isSubmitting }
  } = useForm<RegisterUserInput>({
    resolver: zodResolver(registerUserSchema)
  })

  const [alert, setAlert] = useState<AlertProps>()

  const { mutate } = useUpdateUser({
    onSuccess: () => {
      setAlert({ message: 'Usuario actualizado correctamente', status: 'success' })
      void router.push('/admin/user/list')
    },
    onError: () => {
      setAlert({ message: 'El usuario o correo ya existe', status: 'warning' })
    }
  })

  const useOnSubmit: SubmitHandler<RegisterUserInput> = data => {
    mutate(data)
  }

  const onCancel = (): void => {
    router.back()
  }

  return (
    <AdminLayout navbarText='User Edit'>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <UserAddView control={control} alert={alert} disabled={!isLoading || isSubmitting} onSubmit={handleSubmit(useOnSubmit)} onCancel={onCancel} />
      </Box>
    </AdminLayout>
  )
}
