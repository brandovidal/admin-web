import { PatternFormat } from 'react-number-format'

import classNames from 'classnames'
import { useColorMode } from '@chakra-ui/react'

import { NO_OP, ASTERIK_SYMBOL } from '@/constants/default'

export const ReactNumberFormat = ({
  type = 'tel',
  value = '',
  maxLength = 8,
  placeholder = '87654321',
  prefix = '',
  format = '',
  mask = '',
  decimalScale = 2,
  fixedDecimalScale = true,
  thousandSeparator = true,
  allowLeadingZeros = true,
  errors = false,
  disabled = false,
  onValueChange = NO_OP,
  other
}): JSX.Element => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const formatValue = format === '' ? String(ASTERIK_SYMBOL).repeat(maxLength) : format

  const className = classNames(
    'custom-datapicker-input',
    !isDark || 'custom-datapicker-input-dark',
    !errors || 'custom-datapicker-input-error',
    (!errors && !isDark) || 'custom-datapicker-input-error-dark'
  )

  return (
    <PatternFormat
      itemRef='input'
      {...other}
      type={type}
      autoComplete='off'
      // maxLength={maxLength}
      // className={className}
      // placeholder={placeholder}
      // prefix={prefix}
      // format={formatValue}
      // mask={mask}
      // decimalScale={decimalScale}
      // fixedDecimalScale={fixedDecimalScale}
      // thousandSeparator={thousandSeparator}
      // allowLeadingZeros={allowLeadingZeros}
      value={value}
      onValueChange={onValueChange}
    //   disabled={disabled}
    />
  )
}
