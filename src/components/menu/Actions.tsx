import React from 'react'

// interfaces
import type { MenuActionsProps } from '@/interfaces/common/MenuActions'

// utils

// styles
import { Icon, Flex, Text, Menu, MenuButton, MenuItem, MenuList, useDisclosure, useColorModeValue } from '@chakra-ui/react'

// icons
import { MdKeyboardArrowDown } from 'react-icons/md'

export default function MenuActions ({ actions = [] }: MenuActionsProps): JSX.Element {
  const textColor = useColorModeValue('gray.700', 'whiteAlpha.700')
  const textHover = useColorModeValue({ color: 'gray.900', bg: 'white' }, { color: 'white', bg: 'brand.800' })
  const bgList = useColorModeValue('whiteAlpha.300', 'gray.900')
  const bgShadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset')
  const bgButton = useColorModeValue('gray.100', 'whiteAlpha.4100')
  const bgColor = useColorModeValue('brand.500', 'brand.400')
  const bgHover = useColorModeValue({ bg: 'gray.200' }, { bg: 'whiteAlpha.200' })
  const bgFocus = useColorModeValue({ bg: 'gray.200' }, { bg: 'whiteAlpha.200' })

  // Ellipsis modals
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (actions.length === 0) return (<></>)

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton
        display='flex'
        flexDir='row'
        alignItems='center'
        justifyContent='center'
        bg={bgButton}
        color={bgColor}
        _hover={bgHover}
        _focus={bgFocus}
        _active={bgFocus}
        lineHeight='100%'
        onClick={onOpen}
        borderRadius='0.5rem'
      >
        <Flex align='center' m='0.5rem' gap='0.25rem'>
          Actions
          <Icon as={MdKeyboardArrowDown} color={bgColor} w='1rem' h='1rem' />
        </Flex>
      </MenuButton>
      <MenuList w='150px' minW='unset' maxW='150px !important' backdropFilter='blur(6px)' bg={bgList} boxShadow={bgShadow} borderRadius='0.5rem' p='10px'>
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
