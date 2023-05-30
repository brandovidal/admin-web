import React, { useState, useEffect, useMemo } from 'react'

import { Button, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react'

import { type PaginationProps } from '@/views/admin/default/variables/columnsData'

const Pagination = ({
  page,
  pageChangeHandler,
  total,
  limit,
  isLoading = false
}: PaginationProps): JSX.Element => {
  // Calculating max number of pages
  const totalOfPages = Math.ceil(total / limit)

  // Navigation arrows enable/disable state
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoNext, setCanGoNext] = useState(true)

  // Creating an array with length equal to no.of pages
  const pagesArray = useMemo(() => {
    const offsetPage = totalOfPages - page + 1
    if (totalOfPages <= 3) {
      return [...new Array(totalOfPages)].map((_, index) => index + 1)
    } else if (offsetPage <= 2 && offsetPage > 0) {
      return [totalOfPages - 2, totalOfPages - 1, totalOfPages]
    } else if (page === 1) {
      return [page, page + 1, page + 2]
    }
    return [page - 1, page, page + 1]
  }, [totalOfPages, page])

  // Onclick handlers for the butons
  const onNextPage = (): void => { pageChangeHandler(page + 1) }
  const onPrevPage = (): void => { pageChangeHandler(page - 1) }
  const onPageSelect = (pageNo: number): void => { pageChangeHandler(pageNo) }

  useEffect(() => {
    if (totalOfPages === page) {
      setCanGoNext(false)
    } else {
      setCanGoNext(true)
    }

    if (page === 1) {
      setCanGoBack(false)
    } else {
      setCanGoBack(true)
    }
  }, [totalOfPages, page])

  // To set the starting index of the page
  useEffect(() => {
    pageChangeHandler(page)
  }, [page, pageChangeHandler, limit])

  const textColor = useColorModeValue('gray.500', 'white')

  return (
    <>
      {isLoading
        ? (
        <Flex justifyContent="center" alignItems="center" py="10">
          <Text color={textColor}>Pagination...</Text>
        </Flex>
          )
        : totalOfPages > 1
          ? (
        <Flex
          flexDirection={['column', 'column', 'row', 'row']}
          justifyContent="space-between"
          alignItems="center"
          gap={['3', '3', '0', '0']}
          px="5"
        >
          <Text color={textColor}>
            Page {page} de {totalOfPages}
          </Text>

          <Stack direction="row">
            {page === 1
              ? null
              : (
              <Button
                variant="outline"
                borderRadius="full"
                onClick={onPrevPage}
                disabled={!canGoBack}
              >
                &#8249;
              </Button>
                )}

            {pagesArray.map((number) => (
              <Button
                key={number}
                borderRadius="full"
                onClick={() => { onPageSelect(number) }}
                variant={number === page ? 'solid' : 'outline'}
                bg={number === page ? 'brand.500' : 'transparent'}
                color={number === page ? 'white' : 'gray.400'}
              >
                {number}
              </Button>
            ))}

            {page === totalOfPages
              ? null
              : (
              <Button
                variant="outline"
                borderRadius="full"
                onClick={onNextPage}
                disabled={!canGoNext}
              >
                &#8250;
              </Button>
                )}
          </Stack>
        </Flex>
            )
          : null}
    </>
  )
}

export default Pagination
