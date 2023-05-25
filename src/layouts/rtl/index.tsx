import { type PropsWithChildren, useEffect, useState } from 'react'

// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react'
import { getActiveNavbar, getActiveNavbarText, getActiveRoute, isWindowAvailable } from '@utils/navigation'

import Footer from '@/components/footer/FooterAdmin'
import Navbar from '@/components/navbar/NavbarRTL'
import Sidebar from '@/components/sidebar/Sidebar'
import { RtlProvider } from '@/components/rtlProvider/RtlProvider'

import { SidebarContext } from '@/contexts/SidebarContext'

import routes from '@/routes'

interface RTLLayoutProps extends PropsWithChildren { }

// Custom Chakra theme
export default function RTLLayout(props: RTLLayoutProps): JSX.Element {
  const { children, ...rest } = props
  const [fixed] = useState(false)
  const [toggleSidebar, setToggleSidebar] = useState(false)

  useEffect(() => {
    if (!isWindowAvailable()) return
    window.document.documentElement.dir = 'rtl'
  })

  const { onOpen } = useDisclosure()
  return (
    <RtlProvider>
      <Box>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar
          }}
        >
          <Sidebar routes={routes} display='none' {...rest} />
          <Box
            float='left'
            minHeight='100vh'
            height='100%'
            overflow='auto'
            position='relative'
            maxHeight='100%'
            w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
            maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
            transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
            transitionDuration='.2s, .2s, .35s'
            transitionProperty='top, bottom, width'
            transitionTimingFunction='linear, linear, ease'
          >
            <Portal>
              <Box>
                <Navbar
                  onOpen={onOpen}
                  logoText={'Panel Dashboard'}
                  brandText={getActiveRoute(routes)}
                  secondary={getActiveNavbar(routes)}
                  message={getActiveNavbarText(routes)}
                  fixed={fixed}
                  {...rest}
                />
              </Box>
            </Portal>

            <Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>
              {children}
            </Box>
            <Box>
              <Footer />
            </Box>
          </Box>
        </SidebarContext.Provider>
      </Box>
    </RtlProvider>
  )
}
