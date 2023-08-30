import { NumericFormat } from 'react-number-format'

import { Input, useColorMode, useColorModeValue } from '@chakra-ui/react'
import classNames from 'classnames'

import { NO_OP } from '@/constants/default'

import { type ReactNumericFormatProps } from '@/interfaces/libs/ReactNumberFormat'

export const ReactNumericFormat = ({
  type = 'tel',
  value,
  maxLength = 8,
  placeholder = '87654321',
  prefix = '',
  decimalScale = 2,
  decimalSeparator = '.',
  thousandSeparator = ',',
  fixedDecimalScale = true,
  allowLeadingZeros = false,
  allowNegative = false,
  invalid = false,
  disabled = false,
  onValueChange = NO_OP
}: ReactNumericFormatProps): JSX.Element => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const className = classNames(
    'custom-datapicker-input',
    isDark && 'custom-datapicker-input-dark',
    invalid && 'custom-datapicker-input-error',
    (invalid && isDark) && 'custom-datapicker-input-error-dark'
  )

  const inputColor = useColorModeValue('secondaryGray.800', 'white')
  const inputBg = useColorModeValue('white', 'gray.700')

  return (
    <NumericFormat
      type={type}
      customInput={Input}
      className={className}
      color={inputColor}
      backgroundColor={inputBg}
      autoComplete='off'
      maxLength={maxLength}
      placeholder={placeholder}
      prefix={prefix}
      decimalScale={decimalScale}
      decimalSeparator={decimalSeparator}
      thousandSeparator={thousandSeparator}
      disabled={disabled}
      value={value}
      onValueChange={onValueChange}
      fixedDecimalScale={fixedDecimalScale}
      allowLeadingZeros={allowLeadingZeros}
      allowNegative={allowNegative}
      valueIsNumericString
    />
  )
}
