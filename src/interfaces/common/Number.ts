/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldError } from 'react-hook-form'
import type { ReactNumberFormatProps } from '../libs/ReactNumberFormat'

export interface NumberProps extends ReactNumberFormatProps {
  name: string
  control?: any
  label?: string
  leftIconText?: string
  rightIconText?: string
  placeholder?: string
  helperText?: string
  error?: FieldError
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
