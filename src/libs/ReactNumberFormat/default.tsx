import { PatternFormat } from 'react-number-format'

import { Input, useColorMode } from '@chakra-ui/react'
import classNames from 'classnames'

import { NO_OP, ASTERIK_SYMBOL } from '@/constants/default'

import { type ReactNumberFormatProps } from '@/interfaces/common/Number'

export const ReactNumberFormat = ({
  type = 'tel',
  value = '',
  inputColor = '',
  maxLength = 8,
  placeholder = '87654321',
  prefix = '',
  format = '',
  mask = '',
  invalid = false,
  disabled = false,
  onValueChange = NO_OP
}: ReactNumberFormatProps): JSX.Element => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const formatValue = format === '' ? String(ASTERIK_SYMBOL).repeat(maxLength) : format

  const className = classNames(
    'custom-datapicker-input',
    !isDark || 'custom-datapicker-input-dark',
    !invalid || 'custom-datapicker-input-error',
    (!invalid && isDark) || 'custom-datapicker-input-error-dark'
  )

  return (
    <PatternFormat
      type={type}
      customInput={Input}
      className={className}
      color={inputColor}
      autoComplete='off'
      format={formatValue}
      maxLength={maxLength}
      placeholder={placeholder}
      prefix={prefix}
      mask={mask}
      disabled={disabled}
      value={value}
      onValueChange={onValueChange}
      valueIsNumericString={true}
    />
  )
}
