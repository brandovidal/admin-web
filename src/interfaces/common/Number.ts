/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldError } from 'react-hook-form'
import type { ReactNumericFormatProps, ReactPatternFormatProps } from '../libs/ReactNumberFormat'

export interface PatternProps extends ReactPatternFormatProps {
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
  isOptional?: boolean
}
export interface NumericProps extends ReactNumericFormatProps {
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
  isOptional?: boolean
}
