// styles
import { FormControl, FormHelperText, FormLabel, Text, useColorModeValue } from '@chakra-ui/react'

// interfaces
import type { NumberProps } from '@/interfaces/common/Number'

// form
import { Controller } from 'react-hook-form'

// libs
import isEmpty from 'just-is-empty'
import { ReactNumberFormat } from '@/libs/ReactNumberFormat/default'

function NumberInput ({
  control,
  name,
  type,
  label,
  helperText,
  placeholder,
  prefix,
  mask,
  maxLength,
  decimalScale,
  fixedDecimalScale,
  thousandSeparator,
  allowLeadingZeros,
  disabled
}: NumberProps): JSX.Element {
  const labelColor = useColorModeValue('gray.800', 'whiteAlpha.800')

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...other }, fieldState: { error, invalid } }) => (
        <FormControl fontSize='sm' isInvalid={invalid} >
          <FormLabel color={labelColor} fontWeight='medium'>{label}</FormLabel>
          <ReactNumberFormat
            type={type}
            maxLength={maxLength}
            placeholder={placeholder}
            prefix={prefix}
            mask={mask}
            decimalScale={decimalScale}
            thousandSeparator={fixedDecimalScale}
            fixedDecimalScale={thousandSeparator}
            allowLeadingZeros={allowLeadingZeros}
            onValueChange={onChange}
            disabled={disabled}
            other={other}
          />
          {!isEmpty(error?.message) && (<Text color='red.300' mt='2'>{error?.message}</Text>)}
          {!isEmpty(helperText) && (<FormHelperText color='secondaryGray.500'>{helperText}</FormHelperText>)}
        </FormControl>
      )}
    />
  )
}

export default NumberInput
