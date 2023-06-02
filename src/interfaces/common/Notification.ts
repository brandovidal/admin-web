import type { ToastPosition } from '@chakra-ui/react'

type ToastStatus = 'success' | 'error' | 'warning' | 'info' | 'loading'
export interface ToastProps {
  title: string
  description: string
  status?: ToastStatus
  variant?: string
  position?: ToastPosition
  duration?: number
  isClosable?: boolean
}
export interface NotificationProps {
  showToast: (props: ToastProps) => void
  showErrorToast: (props: ToastProps) => void
}
