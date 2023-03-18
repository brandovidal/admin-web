import { useState } from 'react'

// styles
import { Button, FormControl, FormLabel, Input as InputUI, InputGroup, InputRightElement, Text, useColorModeValue } from '@chakra-ui/react'

// interfaces
import type { InputProps } from '@/interfaces/Input'

// form
import { Controller } from 'react-hook-form'

// libs
import isEmpty from 'just-is-empty'

const PasswordInput = ({ control, name, label = '', placeholder, disabled = false, hasAutoComplete = true }: InputProps): JSX.Element => {
  const textColor = useColorModeValue('secondaryGray.900', 'white')

  const [show, setShow] = useState(false)
  const handleShow = (): void => {
    setShow(!show)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = '' }, fieldState: { error, invalid } }) => (
        <FormControl fontSize='12' isInvalid={invalid}>
          <FormLabel>{label}</FormLabel>
          <InputGroup size='md'>
            <InputUI
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder={placeholder}
              color={textColor}
              {...(hasAutoComplete && { autoComplete: 'new-password' })}
              onChange={onChange}
              value={value}
              disabled={disabled}
            />
            <InputRightElement width='4.5rem' borderRadius='16px'>
              <Button h='1.75rem' size='sm' borderRadius='10px' onClick={handleShow}>
                {show ? 'Ocultar' : 'Mostrar'}
              </Button>
            </InputRightElement>
          </InputGroup>
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

export default PasswordInput
