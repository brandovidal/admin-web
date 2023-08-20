// styles
import { FormControl, FormHelperText, FormLabel, Input, Text, useColorModeValue } from '@chakra-ui/react'

// interfaces
import type { InputProps } from '@/interfaces/common/Input'

// form
import { Controller } from 'react-hook-form'

// libs
import isEmpty from 'just-is-empty'

function DefaultInput ({ control, rules, name, type = 'text', label = '', helperText = '', placeholder, maxLength, disabled = false, hasAutoComplete = true }: InputProps): JSX.Element {
  const inputColor = useColorModeValue('secondaryGray.800', 'white')
  const labelColor = useColorModeValue('gray.800', 'whiteAlpha.800')

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value = '' }, fieldState: { error, invalid } }) => (
        <FormControl fontSize='sm' isInvalid={invalid} >
          <FormLabel color={labelColor} fontWeight='medium'>{label}</FormLabel>
          <Input
            type={type}
            placeholder={placeholder}
            color={inputColor}
            {...(hasAutoComplete && { autoComplete: 'new-password' })}
            errorBorderColor='red.300'
            onChange={onChange}
            value={value}
            maxLength={maxLength}
            disabled={disabled}
          />
          {!isEmpty(error?.message) && (<Text color='red.300' mt='2'>{error?.message}</Text>)}
          {!isEmpty(helperText) && (<FormHelperText color='secondaryGray.500'>{helperText}</FormHelperText>)}
        </FormControl>
      )}
    />
  )
}

export default DefaultInput
