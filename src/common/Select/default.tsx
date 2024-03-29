// styles
import { FormControl, FormHelperText, FormLabel, Text, useColorModeValue } from '@chakra-ui/react'

// form
import { Controller } from 'react-hook-form'

// libs
import isEmpty from 'just-is-empty'

// interfaces
import type { SelectProps } from '@/interfaces/common/Select'

import { ReactSelect } from '@/libs/ReactSelect/default'

function Default ({ control, options = [], name, label = '', helperText = '', placeholder = 'Select an option', noOptionsMessage = 'No data available', isMulti = false, isSearchable = true, isClearable = true, isDisabled = false }: SelectProps): JSX.Element {
  const labelColor = useColorModeValue('gray.800', 'whiteAlpha.800')

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = '' }, fieldState: { error, invalid } }) => (
        <FormControl fontSize='sm' isInvalid={invalid}>
          <FormLabel color={labelColor} fontWeight='medium'>{label}</FormLabel>
          <ReactSelect
            placeholder={placeholder}
            noOptionsMessage={noOptionsMessage}
            options={options}
            onChange={(option) => {
              if (option === null || isEmpty(option)) {
                onChange(null)
                return
              }
              onChange(option)
            }}
            value={value}
            invalid={invalid}
            isMulti={isMulti}
            isSearchable={isSearchable}
            isClearable={isClearable}
            isDisabled={isDisabled}
          />
          {!isEmpty(error?.message) && (<Text color='red.300' mt='2'>{error?.message}</Text>)}
          {!isEmpty(helperText) && (<FormHelperText color='secondaryGray.500'>{helperText}</FormHelperText>)}
        </FormControl>
      )}
    />
  )
}

export default Default
