// interfaces
import type { AlertProps } from '@/interfaces/Alert'

// styles
import { Alert as AlertUI, AlertIcon, Stack } from '@chakra-ui/react'

const Alert = ({ status, message }: AlertProps): JSX.Element => {
  return (
    <Stack paddingBottom={6}>
      <AlertUI status={status}>
        <AlertIcon />
        {message}
      </AlertUI>
    </Stack>
  )
}

export default Alert
