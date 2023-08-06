// styles
import { FormControl, FormHelperText, FormLabel, Input as InputUI, Text, useColorModeValue } from '@chakra-ui/react'

// interfaces
import type { InputProps } from '@/interfaces/common/Input'

// form
import { Controller } from 'react-hook-form'

// libs
import isEmpty from 'just-is-empty'

function Input ({ control, name, type = 'text', label = '', helperText = '', placeholder, disabled = false, hasAutoComplete = true }: InputProps): JSX.Element {
  const textColor = useColorModeValue('secondaryGray.900', 'white')

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = '' }, fieldState: { error, invalid } }) => (
        <FormControl fontSize='sm' isInvalid={invalid} >
          <FormLabel>{label}</FormLabel>
          <InputUI
            type={type}
            placeholder={placeholder}
            color={textColor}
            {...(hasAutoComplete && { autoComplete: 'new-password' })}
            errorBorderColor='red.300'
            onChange={onChange}
            value={value}
            disabled={disabled}
          />
          {!isEmpty(error?.message) && (
            <Text color='red.300' mt='2'>
              {error?.message}
            </Text>
          )}
          {!isEmpty(helperText) && (
            <FormHelperText color='secondaryGray.500'>
              {helperText}
            </FormHelperText>
          )}

        </FormControl>
      )}
    />
  )
}

export default Input
