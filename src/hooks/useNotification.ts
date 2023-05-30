// interfaces
import type { NotificationProps, ToastProps } from '@/interfaces/Notification'

// styles
import { useToast, useColorMode } from '@chakra-ui/react'

export const useNotification = (): NotificationProps => {
  const toast = useToast()

  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const showToast = ({
    title = '',
    description = '',
    status = 'success',
    variant = isDark ? 'solid' : 'left-accent',
    position = 'top',
    duration = 6000,
    isClosable = true
  }: ToastProps): void => {
    toast({
      title,
      description,
      status,
      variant,
      position,
      duration,
      isClosable
    })
  }

  const showErrorToast = ({ title = 'Error Interno', description = 'Ocurrió un error, vuelva a intentarlo más tarde.' }: ToastProps): void => {
    showToast({
      title,
      description,
      status: 'error'
    })
  }

  return { showToast, showErrorToast }
}
