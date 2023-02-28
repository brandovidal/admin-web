import { chakra, useColorMode } from '@chakra-ui/system'
import isEmpty from 'just-is-empty'
import { type ComponentProps } from 'react'
import { Image } from './Image'

interface AvatarImageProps extends ComponentProps<typeof Image> {
  showBorder?: boolean
}

export function NextAvatar ({
  src,
  showBorder,
  alt,
  style,
  ...props
}: AvatarImageProps): JSX.Element {
  const { colorMode } = useColorMode()

  return (
    <Image
      {...props}
      {...(isEmpty(showBorder)
        ? {
            border: '2px',
            borderColor: colorMode === 'dark' ? 'navy.700' : 'white'
          }
        : {})}
      alt={alt}
      src={src}
      style={{ ...style, borderRadius: '50%' }}
    />
  )
}

export const ChakraNextAvatar = chakra(NextAvatar, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})
