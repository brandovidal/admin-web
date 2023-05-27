// styles
// import { type ToastState } from '@chakra-ui/react'

type status = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  title?: string
  description?: string
  duration?: number
  status?: status
}
