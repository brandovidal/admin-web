// styles
import { FormControl, FormHelperText, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Text, useColorModeValue } from '@chakra-ui/react'

// form
import { Controller } from 'react-hook-form'

import isEmpty from 'just-is-empty'

// interfaces
import type { NumberProps } from '@/interfaces/common/Number'

// libs
import { ReactNumberFormat } from '@/libs/ReactNumberFormat/default'

function NumberInput ({
  control,
  name,
  format,
  type = 'tel',
  label,
  leftIconText = '',
  rightIconText = '',
  helperText,
  placeholder,
  prefix,
  mask,
  maxLength,
  disabled
}: NumberProps): JSX.Element {
  const labelColor = useColorModeValue('gray.800', 'whiteAlpha.800')
  const inputColor = useColorModeValue('secondaryGray.800', 'white')

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = '' }, fieldState: { error, invalid } }) => (
        <FormControl fontSize='sm' isInvalid={invalid} >
          <FormLabel color={labelColor} fontWeight='medium'>{label}</FormLabel>
          <InputGroup>
          {!isEmpty(leftIconText) && <InputLeftAddon>{leftIconText}</InputLeftAddon>}
            <ReactNumberFormat
              type={type}
              inputColor={inputColor}
              format={format}
              maxLength={maxLength}
              placeholder={placeholder}
              prefix={prefix}
              mask={mask}
              onValueChange={onChange}
              value={value}
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

export default NumberInput