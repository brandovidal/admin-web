// styles
import { FormControl, FormLabel, Input, Text, useColorModeValue } from '@chakra-ui/react'

// interfaces
import type { InputProps } from '@/interfaces/common/Input'

// libs
import isEmpty from 'just-is-empty'

const Custom = ({ type = 'text', label = '', value = '', placeholder, error, invalid, disabled = false, hasAutoComplete = true, onChange }: InputProps): JSX.Element => {
  const textColor = useColorModeValue('secondaryGray.900', 'white')

  return (
    <FormControl fontSize='sm' isInvalid={invalid}>
      <FormLabel>{label}</FormLabel>
      <Input
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
  )
}

export default Custom
