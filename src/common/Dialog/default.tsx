import { useRef } from "react"

import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"

import { NO_OP } from "@/constants/default"

interface DialogProps {
  title?: string
  message?: string
  isOpen: boolean
  onClose: () => void
  onCloseComplete?: () => void
}

const Dialog = ({ title = 'Delete item', message = 'Are you sure you want to delete', isOpen = false, onClose = NO_OP, onCloseComplete = NO_OP }: DialogProps) => {
  const cancelRef = useRef<any>()

  return (
  <AlertDialog
    motionPreset='slideInBottom'
    leastDestructiveRef={cancelRef}
    onClose={onClose}
    isOpen={isOpen}
    isCentered
  >
    <AlertDialogOverlay />
  
    <AlertDialogContent>
      <AlertDialogHeader>{title}</AlertDialogHeader>
      <AlertDialogCloseButton />
      <AlertDialogBody>{message}</AlertDialogBody>
      <AlertDialogFooter>
        <Button ref={cancelRef} onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme='red' ml={3} onClick={onCloseComplete}>
          Delete
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default Dialog