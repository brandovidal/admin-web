// styles
import { FormControl, FormHelperText, FormLabel, Radio, RadioGroup, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'

// interfaces
import type { RadioProps } from '@/interfaces/common/Radio'

// form
import { Controller } from 'react-hook-form'

// libs
import isEmpty from 'just-is-empty'

function Default ({ control, name, label = '', helperText = '', options = [], disabled = false }: RadioProps): JSX.Element {
  const labelColor = useColorModeValue('gray.800', 'whiteAlpha.800')

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = '' }, fieldState: { error, invalid } }) => (
        <FormControl fontSize='sm' isInvalid={invalid}>
          <FormLabel color={labelColor} fontWeight='medium'>{label}</FormLabel>
          <RadioGroup onChange={onChange} value={value} isDisabled={disabled}>
            <SimpleGrid spacing={[2, 5]} minChildWidth='6rem'>
              {options.map(({ label, value }) => (
                <Radio size='sm' colorScheme={'brand'} maxWidth={'6rem'} key={value} value={value}>
                  {label}
                </Radio>
              ))}
            </SimpleGrid>
          </RadioGroup>
          {!isEmpty(error?.message) && (<Text color='red.300' mt='2'>{error?.message}</Text>)}
          {!isEmpty(helperText) && (<FormHelperText color='secondaryGray.500'>{helperText}</FormHelperText>)}
        </FormControl>
      )}
    />
  )
}

export default Default
