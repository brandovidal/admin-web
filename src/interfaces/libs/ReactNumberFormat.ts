import { type PatternFormatProps } from 'react-number-format'

export interface ReactNumberFormatProps extends PatternFormatProps {
  invalid?: boolean
  disabled?: boolean
}
