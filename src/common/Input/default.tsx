// styles
import { Flex, FormControl, FormHelperText, FormLabel, Input, Text, useColorModeValue } from '@chakra-ui/react'

// interfaces
import type { InputProps } from '@/interfaces/common/Input'

import { OPTIONAL } from '@/constants/default'

// form
import { Controller } from 'react-hook-form'

// libs
import isEmpty from 'just-is-empty'

function DefaultInput ({ control, rules, name, type = 'text', label = '', helperText = '', placeholder, maxLength, disabled = false, hasAutoComplete = true, isOptional = false }: InputProps): JSX.Element {
  const inputColor = useColorModeValue('secondaryGray.800', 'white')
  const inputBg = useColorModeValue('white', 'gray.700')
  const labelColor = useColorModeValue('gray.800', 'whiteAlpha.800')

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value = '' }, fieldState: { error, invalid } }) => (
        <FormControl fontSize='sm' isInvalid={invalid}>
          <Flex align={'center'} mb={2}>
            <FormLabel color={labelColor} fontWeight='medium' my={0} mr={2}>{label}</FormLabel>
            {isOptional && (<FormHelperText color='secondaryGray.500' fontSize='sm' my={0}>({OPTIONAL})</FormHelperText>)}
          </Flex>
          <Input
            type={type}
            placeholder={placeholder}
            color={inputColor}
            backgroundColor={inputBg}
            {...(hasAutoComplete && { autoComplete: 'new-password' })}
            errorBorderColor='red.300'
            onChange={onChange}
            value={value}
            maxLength={maxLength}
            disabled={disabled}
          />
          {!isEmpty(error?.message) && (<Text color='red.300' mt='2'>{error?.message}</Text>)}
          {!isEmpty(helperText) && (<FormHelperText color='secondaryGray.500' fontSize='sm'>{helperText}</FormHelperText>)}
        </FormControl>
      )}
    />
  )
}

export default DefaultInput
