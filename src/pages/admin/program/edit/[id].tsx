// libs
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'
import type { Program } from '@/interfaces/api/Program'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import ProgramEditView from '@/views/admin/program/components/ProgramEdit'

// hooks
import { useNotification } from '@/hooks/useNotification'

// services
import { useUpdateProgram } from '@/services/program'

import { useProgramStore } from '@/store/program'

import { COUNTRY_OPTIONS, STATUS_OPTIONS, TRAINING_OPTIONS } from '@/constants/program'

// form
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// schema
import { updateProgramSchema, type UpdateProgramInput } from '@/schemas/program'

import { formatDate } from '@/utils/date'

// styles
import { Box } from '@chakra-ui/react'

import isEmpty from 'just-is-empty'

export default function ProgramEdit (): JSX.Element {
  const router = useRouter()
  const { showToast, showErrorToast } = useNotification()

  const programId = useMemo(() => router.query.id as string, [router.query.id])

  const program = useProgramStore(state => state.program) as Program
  const cleanProgram = useProgramStore(state => state.cleanProgram)

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
    programTraining: false,
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

    const country = countryOptions.find(option => option.value === program?.country) ?? { value: '', label: '' }
    const birthday = formatDate(program?.birthday ?? '')
    const formattedValue = program?.phone ?? null
    const phone = { formattedValue: String(formattedValue), value: formattedValue, floatValue: formattedValue }
    const status = (program?.status ?? false) ? 'active' : 'inactive'

    setValue('id', programId ?? '')
    setValue('name', program.name)
    setValue('lastname', program.lastname)
    setValue('birthday', birthday as unknown as string)
    setValue('country', country as unknown as string)
    setValue('phone', phone as unknown as number)
    setValue('dni', program?.dni as number)
    setValue('email', program?.email)
    setValue('ladline', (program?.ladline ?? '') as number)
    setValue('ruc', (program?.ruc ?? '') as number)
    setValue('status', status as unknown as boolean)
    setValue('businessName', program?.businessName ?? '')
    setValue('studyCenter', program?.studyCenter ?? '')
    setValue('postgraduateTraining', program?.postgraduateTraining ?? false)
    setValue('graduateTraining', program?.graduateTraining ?? false)
    setValue('bachelorTraining', program?.bachelorTraining ?? false)
    setValue('programTraining', program?.programTraining ?? false)
    setValue('workplace', program?.workplace ?? '')
    setValue('workPosition', program?.workPosition ?? '')
    setValue('workAddress', program?.workAddress ?? '')
  }, [program, router, programId, setValue, countryOptions])

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

  const { mutate: updateProgram } = useUpdateProgram({ onSuccess, onError })

  const useOnSubmit: SubmitHandler<UpdateProgramInput> = useCallback(data => {
    setIsSubmitting(true)
    updateProgram(data)
  }, [updateProgram])

  const onCancel = useCallback((): void => {
    cleanProgram()
    router.back()
  }, [router, cleanProgram])

  return (
    <AdminLayout navbarText='Edit Program'>
      <Box pt={{ base: '28', md: '24', xl: '24' }}>
        <ProgramEditView
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
