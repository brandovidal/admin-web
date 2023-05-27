import React from 'react'

// interfaces
import type { MenuActionsProps } from '@/interfaces/MenuActions'

// utils
import isEmpty from 'just-is-empty'

// styles
import { Icon, Flex, Text, Menu, MenuButton, MenuItem, MenuList, useDisclosure, useColorModeValue } from '@chakra-ui/react'

// icons
import { MdOutlineMoreHoriz } from 'react-icons/md'

export default function MenuActions ({ actions = [] }: MenuActionsProps): JSX.Element {
  const textColor = useColorModeValue('secondaryGray.700', 'whiteAlpha.700')
  const textHover = useColorModeValue({ color: 'secondaryGray.900', bg: 'white' }, { color: 'white', bg: 'brand.400' })
  const iconColor = useColorModeValue('brand.500', 'white')
  const bgList = useColorModeValue('whiteAlpha.300', 'secondaryGray.900')
  const bgShadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset')
  const bgButton = useColorModeValue('secondaryGray.400', 'whiteAlpha.400')
  const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.300' })
  const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.500' })

  // Ellipsis modals
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (actions.length === 0) return (<></>)

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton
        alignItems='center'
        justifyContent='center'
        bg={bgButton}
        _hover={bgHover}
        _focus={bgFocus}
        _active={bgFocus}
        lineHeight='100%'
        onClick={onOpen}
        borderRadius='10px'
      >
        <Icon as={MdOutlineMoreHoriz} color={iconColor} w='24px' h='24px' />
      </MenuButton>
      <MenuList w='150px' minW='unset' maxW='150px !important' backdropFilter='blur(6px)' bg={bgList} boxShadow={bgShadow} borderRadius='10px' p='10px'>
        {actions.map(({ icon, label, onClick }, index) => (
          <MenuItem
            key={index}
            transition='0.2s linear'
            p='5px'
            borderRadius='5px'
            color={textColor}
            _hover={textHover}
            bg='transparent'
            _active={{
              bg: bgHover
            }}
            _focus={{
              bg: bgHover
            }}
            mb='5px'
            onClick={onClick}
          >
            <Flex align='center'>
              {icon}
              <Text fontSize='sm' fontWeight='400'>
                {label}
              </Text>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
