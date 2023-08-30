import type { NumericFormatProps, PatternFormatProps } from 'react-number-format'
export interface ReactPatternFormatProps extends PatternFormatProps {
  invalid?: boolean
  disabled?: boolean
}
export interface ReactNumericFormatProps extends NumericFormatProps {
  invalid?: boolean
  disabled?: boolean
}
