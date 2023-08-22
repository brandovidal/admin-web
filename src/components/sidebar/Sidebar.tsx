import React, { useRef } from 'react'

// chakra imports
import { Box, Flex, Drawer, DrawerBody, Icon, useColorModeValue, DrawerOverlay, useDisclosure, DrawerContent, DrawerCloseButton } from '@chakra-ui/react'
import Content from '@/components/sidebar/components/Content'
import { renderThumb, renderTrack, renderView } from '@/components/scrollbar/Scrollbar'
import { Scrollbars } from 'react-custom-scrollbars-2'

// Assets
import { IoMenuOutline } from 'react-icons/io5'
import { type IRoute } from '@/types/navigation'
import { isWindowAvailable } from '@utils/navigation'

interface SidebarResponsiveProps {
  routes: IRoute[]
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
interface SidebarProps extends SidebarResponsiveProps {
  [x: string]: any
}

function Sidebar (props: SidebarProps): JSX.Element {
  const { routes } = props

  const variantChange = '0.2s linear'
  const shadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset')
  // Chakra Color Mode
  const sidebarBg = useColorModeValue('white', 'gray.800')
  const sidebarMargins = '0px'

  // SIDEBAR
  return (
    <Box display={{ sm: 'none', xl: 'block' }} position='fixed' minH='100%'>
      <Box bg={sidebarBg} transition={variantChange} w='300px' h='100vh' m={sidebarMargins} minH='100%' overflowX='hidden' boxShadow={shadow}>
        <Scrollbars universal={true} autoHide renderTrackVertical={renderTrack} renderThumbVertical={renderThumb} renderView={renderView}>
          <Content routes={routes} />
        </Scrollbars>
      </Box>
    </Box>
  )
}

// FUNCTIONS

export function SidebarResponsive (props: SidebarResponsiveProps): JSX.Element {
  const sidebarBackgroundColor = useColorModeValue('white', 'gray.800')
  const menuColor = useColorModeValue('gray.400', 'white')
  // // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  const { routes } = props
  // let isWindows = navigator.platform.startsWith("Win");
  //  BRAND

  return (
    <Flex ref={btnRef} display={{ sm: 'flex', xl: 'none' }} alignItems='center'>
      <Flex w='max-content' h='max-content' onClick={onOpen}>
        <Icon as={IoMenuOutline} color={menuColor} my='auto' w='20px' h='20px' me='10px' _hover={{ cursor: 'pointer' }} />
      </Flex>
      <Drawer isOpen={isOpen} onClose={onClose} placement={isWindowAvailable() && window.document.documentElement.dir === 'rtl' ? 'right' : 'left'} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent w='285px' maxW='285px' bg={sidebarBackgroundColor}>
          <DrawerCloseButton zIndex='3' onClick={onClose} _focus={{ boxShadow: 'none' }} _hover={{ boxShadow: 'none' }} />
          <DrawerBody maxW='285px' px='0rem' pb='0'>
            <Scrollbars universal={true} autoHide renderTrackVertical={renderTrack} renderThumbVertical={renderThumb} renderView={renderView}>
              <Content routes={routes} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}
// PROPS

export default Sidebar
