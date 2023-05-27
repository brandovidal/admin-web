import { Select } from '@chakra-ui/react'

import { type PageSizeFilterProps } from '@/views/admin/default/variables/columnsData'

export const PageSizeFilter = ({
  limit = 10,
  pageSizes = [10, 25, 50, 100, 250, 500],
  setPageSize
}: PageSizeFilterProps): JSX.Element => {
  return (
    <Select
      fontSize='sm'
      minWidth='11rem'
      maxWidth='22rem'
      w={{ xs: '100%', sm: 'auto' }}
      color='gray.500'
      value={limit}
      onChange={(e) => {
        setPageSize(Number(e.target.value))
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
