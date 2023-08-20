/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldError } from 'react-hook-form'
import type { ReactSelectProps } from '../libs/ReactSelect'

export interface SelectProps extends ReactSelectProps {
  name: string
  label: string
  control?: any
  helperText?: string
  error?: FieldError
}
