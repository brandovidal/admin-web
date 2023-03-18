// styles
import { FormControl, FormLabel, Input as InputUI, Text, useColorModeValue } from '@chakra-ui/react'

// interfaces
import type { InputProps } from '@/interfaces/Input'

// form
import { Controller } from 'react-hook-form'

// libs
import isEmpty from 'just-is-empty'

const Input = ({ control, name, type = 'text', label = '', placeholder, disabled = false, hasAutoComplete = true }: InputProps): JSX.Element => {
  const textColor = useColorModeValue('secondaryGray.900', 'white')

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = '' }, fieldState: { error, invalid } }) => (
        <FormControl fontSize='12' isInvalid={invalid}>
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
        </FormControl>
      )}
    />
  )
}

export default Input
