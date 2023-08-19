/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldError } from 'react-hook-form'

export interface NumberProps {
  name: string
  control?: any
  type?: React.HTMLInputTypeAttribute
  label?: string
  placeholder?: string
  prefix?: string
  mask?: string
  helperText?: string
  maxLength?: number
  decimalScale?: number
  fixedDecimalScale?: boolean
  thousandSeparator?: boolean
  allowLeadingZeros?: boolean
  error?: FieldError
  invalid?: boolean
  value?: string
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
