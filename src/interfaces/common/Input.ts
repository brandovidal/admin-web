/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldError } from 'react-hook-form'

export interface InputProps {
  name: string
  control?: any
  type?: React.HTMLInputTypeAttribute
  label?: string
  value?: string
  placeholder?: string
  error?: FieldError
  invalid?: boolean
  disabled?: boolean
  hasAutoComplete?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
