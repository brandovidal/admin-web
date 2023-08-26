/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldError } from 'react-hook-form'

export interface DateProps {
  name: string
  control?: any
  rules?: any
  label?: string
  value?: string
  placeholder?: string
  helperText?: string
  error?: FieldError
  invalid?: boolean
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
