/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldError } from 'react-hook-form'

import type { OptionProps } from './Option'

export interface RadioProps {
  control?: any
  name: string
  label?: string
  value?: string
  helperText?: string
  options: OptionProps[]
  error?: FieldError
  invalid?: boolean
  disabled?: boolean
  optionalText?: string
  isOptional?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
