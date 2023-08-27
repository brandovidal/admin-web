/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldError } from 'react-hook-form'
import type { DateOption } from 'flatpickr/dist/types/options'

export interface DateProps {
  name: string
  control?: any
  rules?: any
  label?: string
  value?: string
  maxDate?: DateOption
  minDate?: DateOption
  placeholder?: string
  helperText?: string
  error?: FieldError
  invalid?: boolean
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
