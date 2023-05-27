import { Box, type ChakraComponent } from '@chakra-ui/react'
import * as React from 'react'

import NextImage from 'next/image'
import { type ComponentProps } from 'react'

type ImageProps = ComponentProps<ChakraComponent<'img', object>>

export const Image = (props: ImageProps): JSX.Element => {
  const { src, alt = '', ...rest } = props
  return (
    <Box overflow={'hidden'} position="relative" {...rest}>
      <NextImage src={src} alt={alt} />
    </Box>
  )
}
