import { useState } from 'react'

// styles
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useColorModeValue, Icon } from '@chakra-ui/react'

// interfaces
import type { InputProps } from '@/interfaces/common/Input'

// form
import { Controller } from 'react-hook-form'

// libs
import isEmpty from 'just-is-empty'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const PasswordInput = ({ control, name, label = '', placeholder, disabled = false, hasAutoComplete = true }: InputProps): JSX.Element => {
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const inputBg = useColorModeValue('white', 'gray.700')
  const labelColor = useColorModeValue('gray.800', 'whiteAlpha.800')

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
        <FormLabel color={labelColor} fontWeight='medium'>{label}</FormLabel>
          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder={placeholder}
              color={textColor}
              backgroundColor={inputBg}
              {...(hasAutoComplete && { autoComplete: 'new-password' })}
              onChange={onChange}
              value={value}
              disabled={disabled}
            />
            <InputRightElement width='4.5rem' borderRadius='16px'>
              <Button h='1.75rem' size='sm' borderRadius='10px' onClick={handleShow}>
                <Icon as={show ? FaEyeSlash : FaEye } w='24px' h='24px' />
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
