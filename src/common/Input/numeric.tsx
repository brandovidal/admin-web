// styles
import { Flex, FormControl, FormHelperText, FormLabel, InputGroup, InputLeftAddon, InputRightAddon, Text, useColorModeValue } from '@chakra-ui/react'

// form
import { Controller } from 'react-hook-form'

import isEmpty from 'just-is-empty'

// interfaces
import type { NumericProps } from '@/interfaces/common/Number'

// libs
import { ReactNumericFormat } from '@/libs/ReactNumberFormat/numeric'

import { OPTIONAL } from '@/constants/default'

function NumericInput ({
  control,
  name,
  type = 'tel',
  label,
  leftIconText = '',
  rightIconText = '',
  helperText,
  placeholder,
  prefix,
  decimalScale,
  decimalSeparator,
  thousandSeparator,
  fixedDecimalScale,
  allowLeadingZeros,
  allowNegative,
  maxLength,
  isOptional = false,
  disabled
}: NumericProps): JSX.Element {
  const labelColor = useColorModeValue('gray.800', 'whiteAlpha.800')

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
        <FormControl fontSize='sm' isInvalid={invalid} >
        <Flex align={'center'} mb={2}>
          <FormLabel color={labelColor} fontWeight='medium' my={0} mr={2}>{label}</FormLabel>
          {isOptional && (<FormHelperText color='secondaryGray.500' fontSize='sm' my={0}>({OPTIONAL})</FormHelperText>)}
        </Flex>
          <InputGroup gap={2}>
            {!isEmpty(leftIconText) && <InputLeftAddon borderWidth={2} borderColor={invalid ? 'red.300' : 'inherit'} borderRadius='md'>{leftIconText}</InputLeftAddon>}
            <ReactNumericFormat
              type={type}
              color='secondaryGray.800'
              maxLength={maxLength}
              placeholder={placeholder}
              prefix={prefix}
              decimalScale={decimalScale}
              decimalSeparator={decimalSeparator}
              thousandSeparator={thousandSeparator}
              fixedDecimalScale={fixedDecimalScale}
              allowNegative={allowNegative}
              allowLeadingZeros={allowLeadingZeros}
              onValueChange={onChange}
              value={value?.value ?? value}
              disabled={disabled}
              invalid={invalid}
            />
            {!isEmpty(rightIconText) && <InputRightAddon>{rightIconText}</InputRightAddon>}
          </InputGroup>
          {!isEmpty(error?.message) && (<Text color='red.300' mt='2'>{error?.message}</Text>)}
          {!isEmpty(helperText) && (<FormHelperText color='secondaryGray.500'>{helperText}</FormHelperText>)}
        </FormControl>
      )}
    />
  )
}

export default NumericInput
