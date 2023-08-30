// libs
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import ProgramEditView from '@/views/admin/program/components/ProgramEdit'

// hooks
import { useNotification } from '@/hooks/useNotification'

// services
import { useUpdateProgram } from '@/services/program'

import type { Program } from '@/interfaces/api/Program'

import { COUNTRY_OPTIONS } from '@/constants/program'

import { useProgramStore } from '@/store/program'

// form
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// schema
import { updateProgramSchema, type UpdateProgramInput } from '@/schemas/program'

// styles
import { Box } from '@chakra-ui/react'
import isEmpty from 'just-is-empty'
import { formatDate } from '@/utils/date'

export default function ProgramEdit (): JSX.Element {
  const router = useRouter()
  const { showToast, showErrorToast } = useNotification()

  const programId = useMemo(() => router.query.id as string, [router.query.id])

  const program = useProgramStore(state => state.program) as Program
  const cleanUser = useProgramStore(state => state.cleanProgram)

  const courseOptions = useMemo(() => COUNTRY_OPTIONS, [])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValues = {
    name: '',
    code: '',
    courseId: '',
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
  } = useForm<UpdateProgramInput>({
    resolver: zodResolver(updateProgramSchema),
    defaultValues
  })

  useEffect(() => {
    if (isEmpty(program)) {
      // showErrorToast({ title: 'No se pudo encontrar el estudiante', description: 'Please try again later' })
      void router.push('/admin/program/list')
      return
    }

    const course = courseOptions.find(option => option.value === program?.courseId) ?? { value: '', label: '' }
    console.log('🚀 ~ file: [id].tsx:82 ~ useEffect ~ course:', course)
    const startDate = formatDate(program?.startDate ?? '')
    const endDate = formatDate(program?.endDate ?? '')
    // const formattedValue = program?.amount ?? null
    // const amount = { formattedValue: String(formattedValue), value: formattedValue, floatValue: formattedValue }

    setValue('id', programId ?? '')
    setValue('name', program.name)
    setValue('startDate', startDate)
    setValue('endDate', endDate)
    setValue('course', course as unknown as string)
    // setValue('amount', amount as unknown as number)
    setValue('amount', (program?.amount ?? '') as number)
    setValue('discount', (program?.discount ?? '') as number)
    setValue('total', (program?.total ?? '') as number)
  }, [program, router, programId, setValue, courseOptions])

  const [alert, setAlert] = useState<AlertProps>()

  const onSuccess = (): void => {
    showToast({ title: 'Program successfully updated', description: 'The program has been successfully updated' })
    setIsSubmitting(false)

    void router.push('/admin/program/list')
  }

  const onError = (): void => {
    setAlert({ message: "Program can't save", status: 'warning' })
    showErrorToast({ title: "Program can't save", description: 'Please, verify your data' })
  }

  const { mutate: editProgram } = useUpdateProgram({ onSuccess, onError })

  const useOnSubmit: SubmitHandler<UpdateProgramInput> = useCallback(data => {
    console.log('🚀 ~ file: add.tsx:97 ~ ProgramEdit ~ data:', data)
    setIsSubmitting(true)
    editProgram(data)
  }, [editProgram])

  const onCancel = useCallback((): void => {
    cleanUser()
    router.back()
  }, [router, cleanUser])

  return (
    <AdminLayout navbarText='Edit Program'>
      <Box pt={{ base: '28', md: '24', xl: '24' }}>
        <ProgramEditView
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
