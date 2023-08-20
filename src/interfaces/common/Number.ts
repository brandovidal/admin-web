/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldError } from 'react-hook-form'
import { type PatternFormatProps } from 'react-number-format'

export interface ReactNumberFormatProps extends PatternFormatProps {
  inputColor?: string
  invalid?: boolean
  disabled?: boolean
}

export interface NumberProps extends ReactNumberFormatProps {
  name: string
  control?: any
  label?: string
  placeholder?: string
  helperText?: string
  error?: FieldError
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
