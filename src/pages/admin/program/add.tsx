// libs
import { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import ProgramAddView from '@/views/admin/program/components/ProgramAdd'

// hooks
import { useNotification } from '@/hooks/useNotification'

// services
import { useCreateProgram } from '@/services/program'

import { COUNTRY_OPTIONS } from '@/constants/program'

// form
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// schema
import { registerProgramSchema, type RegisterProgramInput } from '@/schemas/program'

// styles
import { Box } from '@chakra-ui/react'

export default function ProgramAdd (): JSX.Element {
  const router = useRouter()
  const { showToast, showErrorToast } = useNotification()

  const courseOptions = useMemo(() => COUNTRY_OPTIONS, [])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValues = {
    name: '',
    code: '',
    startDate: undefined,
    endDate: undefined,
    amount: undefined,
    discount: undefined,
    total: undefined,
    status: undefined
  }

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid }
  } = useForm<RegisterProgramInput>({
    resolver: zodResolver(registerProgramSchema),
    defaultValues
  })

  const [alert, setAlert] = useState<AlertProps>()

  const onSuccess = (): void => {
    showToast({ title: 'Program successfully created', description: 'The program has been successfully created' })
    setIsSubmitting(false)

    void router.push('/admin/program/list')
  }

  const onError = (): void => {
    setAlert({ message: "Program can't save", status: 'warning' })
    showErrorToast({ title: "Program can't save", description: 'Please, verify your data' })
  }

  const { mutate: addProgram } = useCreateProgram({ onSuccess, onError })

  const useOnSubmit: SubmitHandler<RegisterProgramInput> = useCallback(data => {
    console.log('🚀 ~ file: add.tsx:97 ~ ProgramAdd ~ data:', data)
    setIsSubmitting(true)
    addProgram(data)
  }, [addProgram])

  const onCancel = useCallback(() => { router.back() }, [router])

  return (
    <AdminLayout navbarText='Add Program'>
      <Box pt={{ base: '28', md: '24', xl: '24' }}>
        <ProgramAddView
          courseOptions={courseOptions}
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
