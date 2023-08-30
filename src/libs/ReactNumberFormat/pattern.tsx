import { PatternFormat } from 'react-number-format'

import { Input, useColorMode, useColorModeValue } from '@chakra-ui/react'
import classNames from 'classnames'

import { NO_OP, PHONE_PLACEHOLDER } from '@/constants/default'

import { type ReactPatternFormatProps } from '@/interfaces/libs/ReactNumberFormat'

import isEmpty from 'just-is-empty'

export const ReactPatternFormat = ({
  type = 'tel',
  value,
  maxLength = 8,
  placeholder = '87654321',
  prefix = '',
  format = '',
  mask = '',
  invalid = false,
  disabled = false,
  onValueChange = NO_OP
}: ReactPatternFormatProps): JSX.Element => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const formatValue = isEmpty(format) ? String(PHONE_PLACEHOLDER).repeat(maxLength) : format

  const className = classNames(
    'custom-datapicker-input',
    isDark && 'custom-datapicker-input-dark',
    invalid && 'custom-datapicker-input-error',
    (invalid && isDark) && 'custom-datapicker-input-error-dark'
  )

  const inputColor = useColorModeValue('secondaryGray.800', 'white')
  const inputBg = useColorModeValue('white', 'gray.700')

  return (
    <PatternFormat
      type={type}
      customInput={Input}
      className={className}
      color={inputColor}
      backgroundColor={inputBg}
      autoComplete='off'
      format={formatValue}
      maxLength={maxLength}
      placeholder={placeholder}
      prefix={prefix}
      mask={mask}
      disabled={disabled}
      value={value}
      onValueChange={onValueChange}
      valueIsNumericString
    />
  )
}
