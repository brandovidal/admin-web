import { Center, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'

import type { ReactTableProps } from '@/interfaces/libs/ReactTable'

const ReactTable = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  prepareRow,
  rows,
  isLoading = false,
  emptyDataMessage = 'No hay datos disponibles'
}: ReactTableProps): JSX.Element => {
  const textColor = useColorModeValue('gray.700', 'white')
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')

  return (
    <>
      {isLoading && (
        <Flex justifyContent='center' alignItems='center' py='10'>
          <Text color='gray.500'>Loading...</Text>
        </Flex>
      )}
      {!isLoading && (
        <Flex flexDir='column' overflow='auto'>
          {rows.length > 0 && (
            <Table {...getTableProps()} variant='simple' color='gray.500' my={{ sm: '6', lg: '8' }} mx={{ sm: '2', lg: '4' }}>
              <Thead>
                {headerGroups.map((headerGroup, index) => (
                  <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, index) => (
                      <Th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        key={index}
                        borderColor={borderColor}
                        minW={{ sm: '4rem', md: '6.5rem', lg: 'auto' }}
                        p={{ sm: '0.5rem', md: '0.75rem 0.5rem', lg: '0.8rem' }}
                      >
                        <Flex justify='space-between' align='center' fontSize={{ sm: 'xs', lg: 'sm' }} color='gray.500'>
                          {column.render('Header')}
                        </Flex>
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                  prepareRow(row)
                  return (
                    <Tr {...row.getRowProps()} key={index}>
                      {row.cells.map((cell, index) => {
                        return (
                          <Td
                            {...cell.getCellProps()}
                            key={index}
                            fontSize={{ sm: 'xs', md: 'sm', lg: 'md' }}
                            minW={{ sm: '4rem', md: '6.5rem', lg: 'auto' }}
                            p={{ sm: '0.5rem', md: '0.75rem 0.5rem', lg: '0.8rem' }}
                            borderColor='transparent'
                            color={textColor}
                          >
                            {cell.render('Cell')}
                          </Td>
                        )
                      })}
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          )}
          {rows.length === 0 && (
            <Center display={{ base: rows.length > 0 ? 'none' : 'flex' }} my={[4, 4, 6, 8]} color='gray.400'>
              {emptyDataMessage}
            </Center>
          )}
        </Flex>
      )}
    </>
  )
}

export default ReactTable
