import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Button, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react'

import { type PaginationProps } from '@/interfaces/libs/ReactTable'

const Pagination = ({ pagination, isLoading = false, pageChangeHandler }: PaginationProps): JSX.Element => {
  // Calculating max number of pages
  const page = pagination?.page ?? 1
  const totalOfPages = pagination?.pageCount ?? 1

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
  const onNextPage = useCallback((): void => { pageChangeHandler(page + 1) }, [page, pageChangeHandler])
  const onPrevPage = useCallback((): void => { pageChangeHandler(page - 1) }, [page, pageChangeHandler])
  const onPageSelect = useCallback((page: number): void => { pageChangeHandler(page) }, [pageChangeHandler])

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
  }, [totalOfPages, page, setCanGoNext, setCanGoBack])

  // To set the starting index of the page
  useEffect(() => {
    pageChangeHandler(page)
  }, [page, pageChangeHandler])

  const textColor = useColorModeValue('gray.500', 'white')

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" py="10">
        <Text color={textColor}>Loading...</Text>
      </Flex>
    )
  }

  if (totalOfPages < 2) {
    return <></>
  }

  const ListOfPageButtons = (): JSX.Element[] => {
    return pagesArray.map((number) => (
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
    ))
  }

  const PreviuousButton = (): JSX.Element => {
    if (page === 1) {
      return <></>
    }

    return (<Button variant="outline" borderRadius="full" onClick={onPrevPage} disabled={!canGoBack}>&#8249;</Button>)
  }
  const NextButton = (): JSX.Element => {
    if (page === totalOfPages) {
      return <></>
    }

    return (<Button variant="outline" borderRadius="full" onClick={onNextPage} disabled={!canGoNext}>&#8250;</Button>)
  }

  return (
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
        { PreviuousButton() }
        { ListOfPageButtons()}
        { NextButton() }
      </Stack>
    </Flex>
  )
}

export default Pagination
