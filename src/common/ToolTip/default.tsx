import { Tooltip, type TooltipProps, useColorModeValue } from '@chakra-ui/react'

function DefaultTooltip ({ label, placement, children }: TooltipProps): JSX.Element {
  const bg = useColorModeValue('bg.light', 'bg.dark')
  const color = useColorModeValue('gray.900', 'gray.100')

  return (
    <Tooltip
      label={label}
      aria-label={String(label)}
      fontFamily='Rubik'
      fontSize='14px'
      bg={bg}
      color={color}
      placement={placement}
      borderWidth='1px'
      borderRadius='3px'
      rounded='md'
      py={2}
    >
      {children}
    </Tooltip>
  )
}

export default DefaultTooltip
