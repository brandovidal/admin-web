// styles
import { Flex, FormControl, FormHelperText, FormLabel, Radio, RadioGroup, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'

// interfaces
import type { RadioProps } from '@/interfaces/common/Radio'

// form
import { Controller } from 'react-hook-form'

// libs
import isEmpty from 'just-is-empty'
import { OPTIONAL } from '@/constants/default'

function Default ({ control, name, label = '', helperText = '', options = [], disabled = false, isOptional = false }: RadioProps): JSX.Element {
  const labelColor = useColorModeValue('gray.800', 'whiteAlpha.800')

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = '' }, fieldState: { error, invalid } }) => (
        <FormControl fontSize='sm' isInvalid={invalid}>
          <Flex align={'center'} mb={2}>
            <FormLabel color={labelColor} fontWeight='medium' my={0} mr={2}>{label}</FormLabel>
            {isOptional && (<FormHelperText color='secondaryGray.500' fontSize='sm' my={0}>({OPTIONAL})</FormHelperText>)}
          </Flex>
          <RadioGroup onChange={onChange} value={value} isDisabled={disabled}>
            <SimpleGrid spacing={[2, 5]} minChildWidth='6rem'>
              {options.map(({ label, value }) => (
                <Radio size='sm' colorScheme={'brand'} maxWidth={'6rem'} key={value} value={value}>{label}</Radio>
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
