// libs
import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import UserAddView from '@/views/admin/user/components/UserAdd'

// form
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// schema
import { registerUserSchema, type RegisterUserInput } from '@/schemas/user'

// hooks
import { useNotification } from '@/hooks/useNotification'

// services
import { useCreateUser } from '@/services/user'

// styles
import { Box } from '@chakra-ui/react'

export default function UserAdd (): JSX.Element {
  const router = useRouter()
  const { showToast, showErrorToast } = useNotification()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<RegisterUserInput>({
    resolver: zodResolver(registerUserSchema)
  })

  const [alert, setAlert] = useState<AlertProps>()

  const onSuccess = (): void => {
    showToast({ title: 'User successfully created', description: 'The user has been successfully created' })
    setIsSubmitting(false)
    void router.push('/admin/user/list')
  }

  const onError = (): void => {
    setAlert({ message: 'El usuario o correo ya existe', status: 'warning' })
    showErrorToast({ title: 'El usuario o correo ya existe', description: 'Por favor, ingresar otro usuario o correo' })
  }

  const { mutate: addUser } = useCreateUser({ onSuccess, onError })

  const useOnSubmit: SubmitHandler<RegisterUserInput> = useCallback(data => {
    setIsSubmitting(true)
    addUser(data)
  }, [addUser])

  const onCancel = useCallback(() => { router.back() }, [router])

  return (
    <AdminLayout navbarText='Add User'>
      <Box pt={{ base: '28', md: '24', xl: '24' }}>
        <UserAddView control={control} alert={alert} isDisabled={!isValid || isSubmitting} isSubmitting={isSubmitting} onSubmit={handleSubmit(useOnSubmit)} onCancel={onCancel} />
      </Box>
    </AdminLayout>
  )
}
