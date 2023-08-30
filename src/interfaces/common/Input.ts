/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldError } from 'react-hook-form'

export interface InputProps {
  name: string
  control?: any
  rules?: any
  type?: React.HTMLInputTypeAttribute
  label?: string
  value?: string
  placeholder?: string
  helperText?: string
  maxLength?: number
  error?: FieldError
  invalid?: boolean
  disabled?: boolean
  isOptional?: boolean
  hasAutoComplete?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
