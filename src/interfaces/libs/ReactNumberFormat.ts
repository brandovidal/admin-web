import { type PatternFormatProps } from 'react-number-format'

export interface ReactNumberFormatProps extends PatternFormatProps {
  inputColor?: string
  invalid?: boolean
  disabled?: boolean
}
