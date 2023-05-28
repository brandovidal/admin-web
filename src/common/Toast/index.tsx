// interfaces
// import type { ToastProps } from '@/interfaces/Toast'

// styles
import { type ToastId, useToast } from '@chakra-ui/react'

interface ToastProps {
  showToast: () => ToastId
}

const Toast = (): ToastProps => {
  const toast = useToast()

  const showToast = (): ToastId => (
    toast({
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 9000,
      isClosable: true
    })
  )

  return { showToast }
}

export default Toast
