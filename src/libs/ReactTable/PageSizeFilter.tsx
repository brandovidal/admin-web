import { Select } from '@chakra-ui/react'

import type { PageSizeFilterProps } from '@/interfaces/libs/ReactTable'

export const PageSizeFilter = ({
  pageSize = 10,
  pageSizes = [5, 10, 25, 50, 100, 250, 500],
  pageSizeHandler
}: PageSizeFilterProps): JSX.Element => {
  return (
    <Select
      fontSize='sm'
      minWidth='11rem'
      maxWidth='22rem'
      w={{ xs: '100%', sm: 'auto' }}
      color='gray.500'
      value={pageSize}
      onChange={(e) => {
        pageSizeHandler(Number(e.target.value))
      }}
    >
      {pageSizes.map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          Mostrar {pageSize} registros
        </option>
      ))}
    </Select>
  )
}
