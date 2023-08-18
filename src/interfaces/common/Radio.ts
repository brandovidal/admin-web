/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldError } from 'react-hook-form'

export interface RadioOptionProps {
  label: string
  value: string
}

export interface RadioProps {
  control?: any
  name: string
  label?: string
  value?: string
  helperText?: string
  options: RadioOptionProps[]
  error?: FieldError
  invalid?: boolean
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
