// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { type IRoute } from '@/types/navigation'

interface SidebarLinksProps {
  routes: IRoute[]
}

export function SidebarLinks (props: SidebarLinksProps) {
  const { routes } = props

  //   Chakra color mode
  const router = useRouter()

  const activeColor = useColorModeValue('gray.700', 'white')
  const inactiveColor = useColorModeValue('secondaryGray.600', 'secondaryGray.600')
  const activeIcon = useColorModeValue('brand.500', 'white')
  const textColor = useColorModeValue('secondaryGray.500', 'white')
  const brandColor = useColorModeValue('brand.500', 'brand.400')

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return router.pathname.includes(routeName)
  }

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes: IRoute[]) => {
    // eslint-disable-next-line array-callback-return
    return routes.map((route, index: number) => {
      if (route.layout === '/admin' || route.layout === '/auth' || route.layout === '/rtl') {
        return (
          <Link key={index} href={route.layout + route.path}>
            {route.icon
              ? (
              <Box>
                <HStack spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'} py='5px' ps='10px'>
                  <Flex w='100%' alignItems='center' justifyContent='center'>
                    <Box color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor} me='18px'>
                      {route.icon}
                    </Box>
                    <Text
                      me='auto'
                      color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
                      fontSize='md'
                      fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}
                    >
                      {route.name}
                    </Text>
                  </Flex>
                  <Box h='36px' w='4px' bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'} borderRadius='5px' />
                </HStack>
              </Box>
                )
              : (
              <Box>
                <HStack spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'} py='5px' ps='10px'>
                  <Text
                    me='auto'
                    color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
                    fontSize='md'
                    fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}
                  >
                    {route.name}
                  </Text>
                  <Box h='36px' w='4px' bg='brand.400' borderRadius='5px' />
                </HStack>
              </Box>
                )}
          </Link>
        )
      }
    })
  }
  //  BRAND
  return <div>{createLinks(routes)}</div>
}

export default SidebarLinks
