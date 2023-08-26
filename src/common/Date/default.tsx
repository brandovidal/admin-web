// styles
import { FormControl, FormHelperText, FormLabel, Text, useColorModeValue } from '@chakra-ui/react'

// form
import { Controller } from 'react-hook-form'

import { ReactFlatpickr } from '@/libs/ReactFlatpickr/default'

// interfaces
import type { DateProps } from '@/interfaces/common/Date'

// libs
import isEmpty from 'just-is-empty'

function Date ({ control, rules, name, label = '', helperText = '', placeholder, disabled = false }: DateProps): JSX.Element {
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
          <ReactFlatpickr
            placeholder={placeholder}
            color={inputColor}
            onChange={onChange}
            value={value}
            invalid={invalid}
            disabled={disabled}
          />
          {!isEmpty(error?.message) && (<Text color='red.300' mt='2'>{error?.message}</Text>)}
          {!isEmpty(helperText) && (<FormHelperText color='secondaryGray.500'>{helperText}</FormHelperText>)}
        </FormControl>
      )}
    />
  )
}

export default Date
