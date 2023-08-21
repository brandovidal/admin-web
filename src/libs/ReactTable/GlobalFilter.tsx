import { useState } from 'react'

import { Input } from '@chakra-ui/react'
import debounce from 'just-debounce-it'

import type { GlobalFilterProps } from '@/interfaces/libs/ReactTable'

export const GlobalFilter = ({
  globalFilter,
  placeholder = 'Buscar por nombre',
  setGlobalFilter
}: GlobalFilterProps): JSX.Element => {
  const TWO_HUNDRED_MS = 300
  const [value, setValue] = useState(globalFilter)

  const onChange = debounce((value: string) => {
    setGlobalFilter(value)
  }, TWO_HUNDRED_MS)

  return (
    <Input
      type="text"
      size="sm"
      minWidth='11rem'
      w={{ xs: '100%', sm: 'auto' }}
      color='gray.500'
      py={5}
      placeholder={placeholder}
      value={value ?? ''}
      onChange={({ target }) => {
        setValue(target.value)
        onChange(target.value)
      }}
    />
  )
}
